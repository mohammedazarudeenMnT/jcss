"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
      if (response.success && response.data?.user) {
        authLogin(response.data.user);
        router.push(redirect || "/admin");
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj.message || "Login failed");
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
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Image
          src="/svg/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
        <h1 className="mt-6 text-2xl font-semibold">Welcome Back</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Sign in to your account
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="login-email">Email Address</Label>
          <Input
            id="login-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="mt-1"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <button
              type="button"
              className="text-xs text-muted-foreground hover:underline"
              onClick={() => router.push("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>
          <div className="relative mt-1">
            <Input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border"
            />
            Remember me
          </label>
        </div>

        <div className="space-y-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            type="button"
            onClick={handleGoogle}
            disabled={loading}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                fill="#4285F4"
                d="M12 11.2v2.8h3.6c-.15.9-.9 2.6-3.6 2.6-2.2 0-4-1.8-4-4s1.8-4 4-4c1.2 0 2.1.5 2.6.9l1.8-1.7C15.6 7.2 13.9 6.4 12 6.4 8.7 6.4 6 9.1 6 12.4s2.7 6 6 6c3.5 0 5.8-2.5 5.8-6 0-.4-.1-.7-.2-1H12z"
              />
            </svg>
            Continue with Google
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a className="underline" onClick={() => router.push("/signup")}>
            Contact Admin
          </a>
        </p>
      </form>
    </div>
  );
}
