"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "@/components/auth-form";
import { Database } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { redirectUrlRegular } from "@/lib/constants";

export default async function Login() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  // const { data: countries } = await supabase.from("countries").select();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent) => {
        if (event === "SIGNED_IN") {
          router.push("/landing");
        }
      }
    );
    return () => authListener.subscription.unsubscribe();
  });

  return (
    <div className="auth-widget">
      <AuthForm viewProps={"sign_in"} redirectTo={redirectUrlRegular} />
      <div className="flex flex-col items-center justify-between text-sm mt-3">
        <a
          href="/forgot-pwd"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Forgot password?
        </a>
        <a
          href="/sign-up"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign Up?
        </a>
      </div>
    </div>
  );
}
