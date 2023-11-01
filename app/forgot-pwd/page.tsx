'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthForm  from "@/components/auth-form";
import { Database } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { redirectUrlToResetPwd } from '@/lib/constants';

export default async function ForgotPwd() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

 useEffect(() => {
  const { data: authListener } = supabase.auth.onAuthStateChange(
    (event: AuthChangeEvent) => {
      if (event === "SIGNED_IN") {
        router.push("/reset-pwd");
      }
    }
  );
  return () => authListener.subscription.unsubscribe();
});


  return (
    <div className="auth-widget">
        <AuthForm viewProps={"forgotten_password"} redirectTo={redirectUrlToResetPwd} />
    </div>
    
  );
}