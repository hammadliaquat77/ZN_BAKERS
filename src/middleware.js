
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: process.env.NODE_ENV === 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token',
  })

  const pathname = request.nextUrl.pathname

  console.log('MIDDLEWARE RUNNING — ROLE:', token?.role, '| PATH:', pathname)

  // Admin — home par aaye toh /admin par bhejo
  if (pathname === '/' && token?.role === 'admin') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Non-admin — /admin access block
  if (pathname.startsWith('/admin') && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/admin/:path*'],
}