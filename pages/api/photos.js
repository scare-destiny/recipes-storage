const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY

export default async function handler(req, res) {
	const request = await fetch(`https://api.pexels.com/v1/search?query=test`, {
		headers: {
			Authorization: API_KEY,
		},
	})
	const data = await request.json()
	res.status(200).json(data.photos)
}
