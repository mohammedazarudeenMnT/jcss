import { fromNodeHeaders } from "better-auth/node";
import { initAuth } from "../lib/auth.js";

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

export const requireAuth = async (req, res, next) => {
  try {
    const auth = initAuth();
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Authentication required",
      });
    }

    req.user = session.user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authorization",
    });
  }
};

export const requireAdmin = async (req, res, next) => {
  try {
    const auth = initAuth();
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Authentication required",
      });
    }

    // Ultimate authority: .env whitelist
    if (!isAdmin(session.user.email)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin access required",
      });
    }

    req.user = session.user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authorization",
    });
  }
};

/**
 * Middleware to check if the user is authenticated and has admin or employee role.
 * Uses the better-auth session.
 */
export const requireAdminOrEmployee = async (req, res, next) => {
  try {
    const auth = initAuth();
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Authentication required",
      });
    }

    const isWhitelistedAdmin = isAdmin(session.user.email);
    const isEmployee = session.user.role === "employee";

    if (!isWhitelistedAdmin && !isEmployee) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin or Employee access required",
      });
    }

    req.user = session.user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authorization",
    });
  }
};
