"use client";

import { useEffect } from "react";
import useAuth from "@/utils/useAuth";
import { Search, Loader2 } from "lucide-react";

export default function LogoutPage() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut({ callbackUrl: "/account/signin", redirect: true });
  }, [signOut]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col items-center justify-center px-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
          <Search className="text-white w-5 h-5" />
        </div>
        <span className="text-2xl font-semibold text-[#111827] tracking-tight">
          LexiClear
        </span>
      </div>
      <div className="flex items-center gap-3 text-[#6B7280]">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">Signing you out...</span>
      </div>
    </div>
  );
}
