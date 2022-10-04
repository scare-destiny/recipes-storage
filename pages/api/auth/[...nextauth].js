import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
	],
}

export default NextAuth(authOptions)
