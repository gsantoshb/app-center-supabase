'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types'

export default function AuthForm({viewProps, redirectTo}:{viewProps:ViewType|undefined, redirectTo: string }) {
  const supabase = createClientComponentClient<Database>()
  return (
    <Auth
      supabaseClient={supabase}
      view={viewProps}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo={redirectTo}
    />
  )
}
