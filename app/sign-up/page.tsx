'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthForm  from "@/components/auth-form";
import { Database } from '@/types';
import { useRouter } from 'next/navigation'

export default async function SignUp() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

 // const { data: countries } = await supabase.from("countries").select();

  return (
    <div className="auth-widget">
        <AuthForm viewProps={"sign_up"} />
              <div className="flex flex-col items-center justify-between text-sm mt-3">
                  <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Login?
                  </a>
                  <a href="/forgot-pwd" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot pwd?
                  </a>
              </div>
    </div>
    
  );
}