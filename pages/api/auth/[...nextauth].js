import NextAuth from "next-auth/next";
import Auth0Provider from 'next-auth/providers/auth0'

export default NextAuth({
    providers: [
        Auth0Provider({
            issuer: process.env.DOMAIN,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET, 
            authorization: `${process.env.DOMAIN}/authorize?response_type=code&prompt=login`
        })        
    ],
    secret: process.env.NEXTAUTH_SECRET
})