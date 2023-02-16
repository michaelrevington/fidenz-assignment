import { NextResponse } from "next/server";
import { withAuth } from 'next-auth/middleware'

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
            if (token) return true;
            return false;
        }
    }
})

export const config = {
    matcher: ["/api/weather"]
}