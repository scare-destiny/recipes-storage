const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY

export default async function handler(req, res) {
	try {
		const request = await fetch(`https://api.pexels.com/v1/search?query=test`, {
			headers: {
				'Authorization': API_KEY,
				// update with your user-agent
				'Accept': 'application/json, text/plain, */*',
				'User-Agent': '*',
			},
		})
		console.log('Entered the serverless function')
		const pexelsResponse = await request.json()

		console.log(pexelsResponse)

		return res.send(pexelsResponse.photos)
	} catch (error) {
		console.log(error)
	}
}
