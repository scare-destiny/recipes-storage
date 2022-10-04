module.exports = {
	reactStrictMode: true,
	trailingSlash: true,
	env: {
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
		FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
	},
}
