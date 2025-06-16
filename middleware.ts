import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest){

    const access= request.cookies.get('access')?.value;


    if(access!=='true'){
        return NextResponse.redirect(new URL('/login',request.url));
    }

      return NextResponse.next();
}

export const config = {
  matcher: ['/upload'],
};