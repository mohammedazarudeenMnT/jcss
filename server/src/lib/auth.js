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
      updateAge: 60 * 60 * 24, // 1 day
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      },
    },

    advanced: {
      useSecureCookies:
        process.env.NODE_ENV === "production" || process.env.VERCEL === "1",
      defaultCookieAttributes: {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production" || process.env.VERCEL === "1",
        sameSite:
          process.env.NODE_ENV === "production" || process.env.VERCEL === "1"
            ? "none"
            : "lax",
        path: "/",
      },
    },

    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
    },

    plugins: [
      admin({
        adminUserIds: [], // Admins can be managed via roles in DB
      }),
    ],

    user: {
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
      },
    },

    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL?.endsWith("/api/auth")
      ? process.env.BETTER_AUTH_URL
      : `${process.env.BETTER_AUTH_URL}/api/auth`,

    trustedOrigins: [process.env.FRONTEND_URL, "http://localhost:3000"].filter(
      Boolean,
    ),

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
