import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    // const requestHeaders = new Headers(request.headers);
    // requestHeaders.set('test', 'hello');
    // let response = NextResponse.next({
    //     headers: requestHeaders,
    // });
    let response = NextResponse.next();
    response.headers.set('test', 'hello');
    return response;
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/addfavor',
}