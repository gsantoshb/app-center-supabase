'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthForm  from "@/components/auth-form";
import { Database } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { redirectUrlRegular } from '@/lib/constants';

export default function ResetPwd() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

 useEffect(() => {
  const { data: authListener } = supabase.auth.onAuthStateChange(
    (event: AuthChangeEvent) => {
      if (event === "SIGNED_IN") {
        router.push("/login");
      }
    }
  );
  return () => authListener.subscription.unsubscribe();
});

  return (
    <div className="auth-widget">
        <AuthForm viewProps={"update_password"} redirectTo={redirectUrlRegular} />
    </div>
    
  );
}