"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, AlertCircle, ArrowRight } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

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

  const redirectUrl = searchParams.get("redirect") || "/admin/newsletters";

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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden p-0 m-0">
      {/* Visual Identity Section - Now visible on mobile as a top banner, and side-by-side on desktop */}
      <div className="relative w-full md:w-1/2 lg:w-[60%] h-[30vh] md:h-screen overflow-hidden group bg-[#020617]">
        <div className="absolute inset-0 transition-transform duration-[20s] ease-linear group-hover:scale-110">
          <Image
            src="/images/login-bg-premium.png"
            alt="JCSS Professional Environment"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>

        {/* Modern Overlay Gradients */}
        <div className="absolute inset-0 bg-linear-to-b from-[#020617]/40 via-transparent to-[#020617]/80 md:bg-linear-to-tr md:from-[#020617]/90 md:via-[#020617]/40 md:to-transparent" />

        <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 max-w-lg z-10 animate-fade-in-up">
          <div className="w-12 md:w-16 h-1 mb-4 md:mb-8 bg-orange-500 rounded-full" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Advancing your <br />
            <span className="text-orange-500">Business Legacy.</span>
          </h2>
          <p className="mt-3 md:mt-6 text-base md:text-xl text-slate-300 leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
            Join the elite circle of professionals managing assets with
            world-class precision and absolute clarity.
          </p>
        </div>

        {/* Floating Accent - Hidden on small mobile */}
        <div className="hidden sm:block absolute top-6 left-6 md:top-12 md:left-12 p-3 md:p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl animate-pulse-slow z-10">
          <p className="text-[8px] md:text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold">
            Priority Access
          </p>
        </div>
      </div>

      {/* Authentication Section - Right Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-white relative z-20 -mt-6 md:mt-0 rounded-t-3xl md:rounded-none shadow-2xl md:shadow-none">
        <div className="w-full max-w-md animate-fade-in py-4">
          <LoginForm redirect={redirectUrl} />
        </div>
      </div>
    </div>
  );
}
