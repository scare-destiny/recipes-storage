module.exports = {
	reactStrictMode: true,
	trailingSlash: true,
	env: {
		NEXTAUTH_SECRET: 'Rs5F9TVf87O/NigI1/5Kv9wydgHoI3JMULIsk7V/i1E=',
		FACEBOOK_CLIENT_ID: '1142200463385977',
		FACEBOOK_CLIENT_SECRET: 'ee0cf361036cdda8a3d764ffc1305cc1',
	},
	images: {
		domains: ['images.pexels.com', 'www.pexels.com'],
	},
	async headers() {
		return [
			{
				// matching all API routes
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
					},
				],
			},
		]
	},
}
