"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { login, signInWithGoogle } from "@/lib/auth-api";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface LoginFormProps {
  redirect?: string;
}

export default function LoginForm({ redirect }: LoginFormProps) {
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(email, password);
      // login() throws on error, so if we reach here, login succeeded
      if (response.data?.user) {
        authLogin(response.data.user);
        router.push(redirect || "/admin");
      } else {
        setError("Login succeeded but no user data received");
      }
    } catch (err) {
      // Error is thrown by login() function
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle(redirect || "/admin");
      // signInWithGoogle will redirect the browser to Google consent
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj.message || "Google sign in failed");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-8 text-left">
        <Image
          src="/svg/logo.svg"
          alt="JCSS Logo"
          width={130}
          height={44}
          className="w-auto h-10 mb-8 transition-opacity hover:opacity-80"
        />
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Welcome back to the <br />
          <span className="text-orange-500">JCSS Portal</span>
        </h1>
        <p className="text-slate-500 font-medium mt-3 text-base leading-relaxed">
          Access your professional dashboard and manage your landscape with
          precision.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm flex items-center gap-3 animate-fade-in shadow-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="font-bold">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div className="space-y-1.5">
          <Label
            htmlFor="login-email"
            className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] ml-1"
          >
            Institutional Email
          </Label>
          <Input
            id="login-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. name@jcss.com"
            className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300 h-12 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-xl px-5 text-base border-2"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between ml-1">
            <Label
              htmlFor="login-password"
              className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]"
            >
              Secure Password
            </Label>
            {/* <button
              type="button"
              className="text-[10px] font-black text-slate-400 hover:text-orange-500 transition-colors uppercase tracking-widest"
              onClick={() => router.push("/forgot-password")}
            >
              Reset?
            </button> */}
          </div>
          <div className="relative group/input">
            <Input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300 h-12 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all rounded-xl px-5 text-base border-2"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between py-0.5">
          <label className="flex items-center gap-2.5 text-slate-500 font-bold text-xs cursor-pointer group/check">
            <div
              className={`w-4.5 h-4.5 rounded border-2 border-slate-200 flex items-center justify-center transition-all duration-300 ${remember ? "bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/20" : "bg-white group-hover/check:border-slate-400"}`}
            >
              {remember && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="hidden"
            />
            Stay authorized
          </label>
        </div>

        <div className="space-y-4 pt-4">
          <Button
            type="submit"
            className="w-full h-13 bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black rounded-xl transition-all shadow-xl shadow-orange-500/10 active:scale-[0.98] text-base tracking-wider group border-0"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <span className="flex items-center justify-center gap-2">
                Authorize Access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.4em] text-slate-300">
              <span className="bg-white px-4">Secure Cloud</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-13 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-black border-2"
            type="button"
            onClick={handleGoogle}
            disabled={loading}
          >
            <div className="p-1 bg-white shadow-sm border border-slate-100 rounded-md shrink-0">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            Institutional Sign-In
          </Button>
        </div>

        <div className="pt-8 text-center">
          <p className="text-slate-400 text-[10px] font-bold leading-relaxed uppercase tracking-wider">
            Unauthorized access is strictly prohibited. <br />
            Need support?{" "}
            <button
              type="button"
              className="text-orange-500 font-black hover:underline underline-offset-4"
              onClick={() => router.push("/contact-us")}
            >
              Contact JCSS Admin
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
