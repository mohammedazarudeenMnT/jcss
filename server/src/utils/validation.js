/**
 * Validation utilities for auth and other endpoints
 */

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === "string" && !value.trim())) {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    };
  }
  return { isValid: true };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Invalid email address",
    };
  }
  return { isValid: true };
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return {
      isValid: false,
      error: "Password must be at least 6 characters long",
    };
  }
  if (password.length > 128) {
    return {
      isValid: false,
      error: "Password must be less than 128 characters",
    };
  }
  return { isValid: true };
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: "Passwords do not match",
    };
  }
  return { isValid: true };
};

export const validateString = (
  value,
  fieldName,
  minLength = 1,
  maxLength = 255,
) => {
  if (!value || typeof value !== "string" || value.trim().length === 0) {
    return {
      isValid: false,
      error: `${fieldName} is required and must be a string`,
    };
  }
  if (value.trim().length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    };
  }
  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} must be less than ${maxLength} characters`,
    };
  }
  return { isValid: true };
};
