import { axiosInstance } from "./axios";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  emailVerified: boolean;
  image?: string;
  banned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    session: {
      id: string;
      userId: string;
      expiresAt: Date;
    };
  };
}

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = async (): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post("/api/auth/logout");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const getSession = async (): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.get("/api/auth/session");
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: "No active session",
    };
  }
};

export const requestPasswordReset = async (
  email: string,
  redirectTo?: string,
) => {
  try {
    const response = await axiosInstance.post("/api/auth/forget-password", {
      email,
      redirectTo: redirectTo || "/reset-password",
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to send reset email",
    );
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await axiosInstance.post("/api/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to reset password",
    );
  }
};

export const signInEmail = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/api/auth/sign-in/email", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
