import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import mongoose from "mongoose";

let authInstance = null;

/**
 * Helper to check if an email is in the admin whitelist
 */
const isAdmin = (email) => {
  if (!email) return false;
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase());
  return adminEmails.includes(email.toLowerCase());
};

/**
 * Plugin to enforce admin roles based on .env whitelist
 * This plugin converts sign-in attempts for admin emails into sign-up attempts
 */
const adminWhitelist = {
  id: "admin-whitelist",
  hooks: {
    before: [
      {
        matcher: (ctx) => ctx.path.includes("/sign-in/email"),
        handler: async (ctx) => {
          const { email, password, name } = ctx.body || {};

          if (isAdmin(email) && password) {
            console.log(`🛡️ Whitelisted admin sign-in attempt: ${email}`);

            // In v1 internalAdapter, findUserByEmail returns { user, accounts }
            const result =
              await ctx.context.internalAdapter.findUserByEmail(email);
            console.log(
              `🔍 DEBUG findUserByEmail(${email}):`,
              JSON.stringify(result, null, 2),
            );
            const user = result?.user;
            const accounts = result?.accounts || [];

            // Check if a VALID account already exists
            const validAccount = accounts.find(
              (a) =>
                (a.providerId === "credential" ||
                  a.provider === "credential") &&
                user &&
                String(a.userId) === String(user.id || user._id),
            );

            if (validAccount) {
              console.log(`✅ Admin already has a valid credential account.`);
              return ctx;
            }

            console.log(`🚀 Linking/Registering admin: ${email}...`);

            try {
              if (!user) {
                console.log(`👤 Creating new admin user (without password)...`);
                // Create user WITHOUT password - we'll add credential account separately
                const newUser = await ctx.context.internalAdapter.createUser({
                  email,
                  name: name || email.split("@")[0],
                  emailVerified: true,
                  role: "admin",
                });

                const newUserId = newUser.id || newUser._id;
                console.log(`✅ User created with ID: ${newUserId}`);

                // Now create the credential account
                const hashedPassword =
                  await ctx.context.password.hash(password);
                await ctx.context.internalAdapter.createAccount({
                  userId: String(newUserId),
                  providerId: "credential",
                  accountId: email,
                  password: hashedPassword,
                });
                console.log(`✅ Credential account linked for new user.`);
              } else {
                const userId = user.id || user._id;
                console.log(
                  `👤 User exists (ID: ${userId}), cleaning up stale accounts...`,
                );

                // Delete any existing credential account to ensure clean state
                try {
                  const stale = await ctx.context.internalAdapter.findAccount({
                    accountId: email,
                    providerId: "credential",
                  });
                  if (stale) {
                    console.log(
                      `🗑️ Deleting stale account: ${stale.id || stale._id}`,
                    );
                    await ctx.context.internalAdapter.deleteAccount({
                      id: stale.id || stale._id,
                    });
                  }
                } catch (e) {
                  // Ignore cleanup errors
                }

                // Create fresh credential account
                const hashedPassword =
                  await ctx.context.password.hash(password);
                const accountData = {
                  userId: String(userId),
                  providerId: "credential",
                  accountId: email,
                  password: hashedPassword,
                };

                console.log(
                  `🔗 Creating credential account for existing user...`,
                );
                await ctx.context.internalAdapter.createAccount(accountData);
                console.log(`✅ Credential account linked successfully.`);
              }
            } catch (err) {
              console.error(`❌ Admin auto-setup failed:`, err.message);
            }
          }
          return ctx;
        },
      },
    ],
    after: [
      {
        matcher: (ctx) =>
          ctx.path.endsWith("/get-session") ||
          ctx.path.endsWith("/sign-in/email") ||
          ctx.path.endsWith("/sign-up/email"),
        handler: async (ctx) => {
          // Surgically modify the user object if it exists in the response
          // Better Auth v1 stores the result in ctx.data
          if (ctx.data && typeof ctx.data === "object" && ctx.data.user) {
            const email = ctx.data.user.email;
            if (isAdmin(email)) {
              ctx.data.user.role = "admin";
            } else if (ctx.data.user.role === "admin") {
              // Strict enforcement: demote if not in .env whitelist
              ctx.data.user.role = "user";
            }
          }
          return ctx;
        },
      },
    ],
  },
};

export const initAuth = () => {
  if (authInstance) return authInstance;

  authInstance = betterAuth({
    database: mongodbAdapter(mongoose.connection.getClient().db("jcss")), // Using "jcss" as db name

    databaseHooks: {
      "user.create.before": async (ctx) => {
        const email = ctx.data.email?.toLowerCase();
        console.log(`🔍 User creation hook triggered for: ${email}`);

        // Auto-assign admin role if email matches configured admin
        if (isAdmin(email)) {
          console.log(`✅ Auto-assigning admin role to: ${email}`);
          ctx.data.role = "admin";
          ctx.data.emailVerified = true; // Auto-verify admin emails
        } else {
          ctx.data.role = "user";
        }

        return ctx;
      },
      "user.create.after": async (ctx) => {
        const email = ctx.data.email?.toLowerCase();
        if (isAdmin(email)) {
          console.log(`🎉 Admin user created successfully: ${email}`);
        }
        return ctx;
      },
    },

    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // Only update session once per day (reduces DB writes)
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // Cache for 5 minutes
      },
    },

    // Advanced configuration for production cookie handling
    // Using the recommended 'advanced' pattern from Better Auth docs
    advanced: {
      // Force secure cookies in production OR Vercel environment
      useSecureCookies:
        process.env.NODE_ENV === "production" || process.env.VERCEL === "1",
      // Default attributes for all cookies
      defaultCookieAttributes: {
        httpOnly: true,
        // vital for Vercel/Render deployments behind load balancers
        secure:
          process.env.NODE_ENV === "production" || process.env.VERCEL === "1",
        // For cross-domain (frontend on domain A, backend on domain B),
        // sameSite MUST be "none" in production with secure: true
        sameSite:
          process.env.NODE_ENV === "production" || process.env.VERCEL === "1"
            ? "none"
            : "lax",
        path: "/",
      },
    },

    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // Better Auth handles the redirect URI automatically based on baseURL.
        // It will be: ${baseURL}/callback/google

        // Ensure email and profile scopes are requested
        scope: ["email", "profile"],

        // Optional: Always ask user to select account
        prompt: "select_account",
        accessType: "offline",
      },
    },

    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
      maxPasswordLength: 128,
      resetPasswordTokenExpiresIn: 3600, // 1 hour
      sendResetPassword: async ({ user, url, token }, request) => {
        console.log(`📧 Password reset requested for: ${user.email}`);
        // Email sending handled by custom endpoint
      },
    },

    plugins: [
      admin({
        adminUserIds: [], // Managed via our custom plugin below
      }),
      // Custom plugin for strict .env whitelist role enforcement
      adminWhitelist,
    ],

    emailVerification: {
      sendVerificationEmail: async ({ user, url, token }) => {
        console.log(`📧 Sending verification email to: ${user.email}`);
        // Email sending will be handled by settings controller for email changes
      },
      autoSignInAfterVerification: true,
    },

    user: {
      changeEmail: {
        enabled: true,
        updateEmailWithoutVerification: false,
      },
      additionalFields: {
        role: {
          type: "string",
          required: false,
          defaultValue: "user",
        },
        banned: {
          type: "boolean",
          required: false,
          defaultValue: false,
        },
        isActive: {
          type: "boolean",
          required: false,
          defaultValue: true,
        },
      },
    },

    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL?.endsWith("/api/auth")
      ? process.env.BETTER_AUTH_URL
      : `${process.env.BETTER_AUTH_URL}/api/auth`,

    trustedOrigins: [
      process.env.FRONTEND_URL,
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5000",
    ].filter(Boolean),

    redirects: {
      resetPassword: process.env.FRONTEND_URL || "http://localhost:3000",
    },
  });

  return authInstance;
};

export const getAuth = () => {
  if (!authInstance) {
    throw new Error("Auth not initialized. Call initAuth() first.");
  }
  return authInstance;
};
