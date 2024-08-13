import { NextResponse } from 'next/server';

const { getToken } = require('next-auth/jwt');
export default function withAuth(middleware, requireAuth) {
  return async (req, next) => {
    const pathname = req.nextUrl.pathname;
    // Pengaturan header caching
    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
    res.headers.set('Surrogate-Control', 'no-store');
      if (requireAuth.some((route) => pathname.startsWith(route))) {
       const toke = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
       });
       console.log(toke);
       if (!toke) {
        const url = new URL("/", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
       }
       if (toke.role === "Admin" && !pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", req.url));
       }

       if (toke.role === "Pegawai" && !pathname.startsWith("/pegawai")) {
        return NextResponse.redirect(new URL("/pegawai", req.url));
       }
      }
    return middleware(req, next);
  };
}
