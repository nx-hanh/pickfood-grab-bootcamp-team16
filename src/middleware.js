import { NextResponse } from 'next/server'
const { verifyToken } = require("@/lib/Backend/authentication/jwt.js")
 

// export function middleware(request) {
//     // Clone the request headers and set a new header `x-hello-from-middleware1`
//     const requestHeaders = new Headers(request.headers)
//     requestHeaders.set('x-hello-from-middleware1', 'hello')
  
//     // You can also set request headers in NextResponse.rewrite
//     const response = NextResponse.next({
//       request: {
//         // New request headers
//         headers: requestHeaders,
//       },
//     })
  
//     // Set a new response header `x-hello-from-middleware2`
//     response.headers.set('x-hello-from-middleware2', 'hello')
//     return response
//   }

export async function middleware(request) {
    let token = request.headers.get('Authorization');
    let decoded = await verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' });
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('decoded', JSON.stringify(decoded));
    let response = NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });
    return response;
}
 
export const config = {
    matcher: ['/api/((?!auth|testcookie).*)']
}