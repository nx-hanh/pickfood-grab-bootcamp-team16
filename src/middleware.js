import { NextResponse } from 'next/server'
const { verifyToken } = require("@/lib/Backend/authentication/jwt.js")
 
export async function middleware(request) {
    let response = NextResponse.next();
    let token = request.headers.get('Authorization');
    let decoded = await verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' });
    response.headers.set('decoded', JSON.stringify(decoded));
    return response;
}
 
export const config = {
    matcher: ['/api/((?!auth).*)']
}