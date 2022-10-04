import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'

export const authOptions = {
	providers: [
		FacebookProvider({
			client_id: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
	],
	secret: 'test',
}

export default NextAuth(authOptions)
