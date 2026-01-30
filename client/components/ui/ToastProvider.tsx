"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      theme="dark" // or "system" depending on pref
      richColors
      closeButton
      style={{
        fontFamily: "var(--font-barlow)", // Match app font
      }}
    />
  );
}
