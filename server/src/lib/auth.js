import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import mongoose from "mongoose";

let authInstance = null;

export const initAuth = () => {
  if (authInstance) return authInstance;

  authInstance = betterAuth({
    database: mongodbAdapter(mongoose.connection.getClient().db("jcss")), // Using "jcss" as db name

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
        adminUserIds: [], // Admins can be managed via roles in DB
      }),
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
