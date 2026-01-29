import { getAuth } from "../lib/auth.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const auth = getAuth();

    const result = await auth.api.signInEmail({
      body: { email, password },
      asResponse: true,
    });

    if (!result.ok) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (result.headers) {
      result.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });
    }

    const data = await result.json();

    if (data.user?.banned) {
      return res
        .status(403)
        .json({ success: false, message: "Your account has been banned" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Login successful", data });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const auth = getAuth();
    const result = await auth.api.signOut({
      headers: req.headers,
      asResponse: true,
    });

    if (result.headers) {
      result.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ success: false, message: "Logout failed" });
  }
};

export const getSession = async (req, res) => {
  try {
    const auth = getAuth();
    const result = await auth.api.getSession({
      headers: req.headers,
      asResponse: true,
    });

    if (!result.ok) {
      return res
        .status(401)
        .json({ success: false, message: "No active session" });
    }

    if (result.headers) {
      result.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });
    }

    const data = await result.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Get session error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to get session" });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email, redirectTo } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const auth = getAuth();
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: redirectTo || `${process.env.FRONTEND_URL}/reset-password`,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent",
    });
  } catch (error) {
    console.error("Forget password error:", error);
    return res
      .status(500)
      .json({ success: false, message: "An error occurred" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Token and new password are required",
        });
    }

    const auth = getAuth();
    await auth.api.resetPassword({
      body: { token, newPassword },
    });

    return res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res
      .status(400)
      .json({
        success: false,
        message: error.message || "Invalid or expired reset token",
      });
  }
};
