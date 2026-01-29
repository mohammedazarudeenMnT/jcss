"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, AlertCircle, ArrowRight } from "lucide-react";
import LoginForm from "@/components/Auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login: authLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const redirectUrl = searchParams.get("redirect") || "/admin";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { login: apiLogin } = await import("@/lib/auth-api");
      const response = await apiLogin(data.email, data.password);

      if (response.success && response.data?.user) {
        authLogin(response.data.user);
        router.push(redirectUrl);
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-200/20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl p-8 z-10 mx-4">
        <LoginForm redirect={redirectUrl} />
      </div>
    </div>
  );
}
