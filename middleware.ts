import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
	const url = req.nextUrl;

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and the current path is / redirect the user to /account
  // if (user && req.nextUrl.pathname === '/') {
  //   console.log("Came there");
  //   return NextResponse.redirect(new URL('/movies', req.url))
  // } 

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user) {
    console.log("No user.Came here:"+req.nextUrl.pathname);
    return NextResponse.redirect(new URL('/login', req.url))
  }

  //return NextResponse.redirect(url);
  if(user)
    return res;

}

export const config = {
  // matcher: ['/:path*'],
  matcher: ['/','/countries'],

}
