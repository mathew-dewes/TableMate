import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

export async function proxy(request: NextRequest) {

  const protectedRoutes = ['/dashboard'];

  const pathname = request.nextUrl.pathname;
  
  const { supabase } = await updateSession(request);
    const {
    data: { user },
  } = await supabase.auth.getUser();

    const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

    if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(loginUrl)
  }
};


export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}