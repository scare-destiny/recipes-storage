export default async function handler(req, res) {
	try {
		const request = await fetch(`https://api.pexels.com/v1/search?query=test`, {
			headers: {
				Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
			},
		})
		console.log('Entered the serverless function')
		const data = await request.json()
		const photos = data.photos

		return res.json({ photos })
	} catch (e) {
		res.status(500).json({ message: e.message })
	}
}
