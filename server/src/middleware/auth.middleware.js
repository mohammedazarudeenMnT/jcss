import { fromNodeHeaders } from "better-auth/node";
import { initAuth } from "../lib/auth.js";

export const requireAuth = async (req, res, next) => {
  try {
    const auth = initAuth();
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized: Authentication required",
        });
    }

    req.user = session.user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res
      .status(500)
      .json({
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

    if (!session || !session.user || session.user.role !== "admin") {
      return res
        .status(403)
        .json({
          success: false,
          message: "Unauthorized: Admin access required",
        });
    }

    req.user = session.user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error during authorization",
      });
  }
};
