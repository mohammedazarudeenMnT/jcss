"use client";

import React from "react";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl transform transition-all scale-100 opacity-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={cn(
                "p-3 rounded-full shrink-0",
                variant === "danger"
                  ? "bg-red-500/10 text-red-500"
                  : "bg-orange-500/10 text-orange-500",
              )}
            >
              <AlertTriangle className="w-6 h-6" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center gap-2",
                variant === "danger"
                  ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                  : "bg-orange-500 hover:bg-orange-600 shadow-orange-500/20",
              )}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              )}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
