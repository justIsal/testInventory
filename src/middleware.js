const { NextResponse, NextRequest } = require('next/server');
const { default: withAuth } = require('./app/middlewares/withAuth');

export function mainMiddleware(req) {
  const res = NextResponse.next();
  return res;
}
export default withAuth(mainMiddleware, ['/admin', '/pegawai']);
