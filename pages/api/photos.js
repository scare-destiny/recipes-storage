const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY

export default async function handler(req, res) {
	try {
		const request = await fetch(`https://api.pexels.com/v1/search?query=test`, {
			headers: {
				'Authorization': API_KEY,
				// update with your user-agent
				'User-Agent':
					'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
				'Accept': 'application/json; charset=UTF-8',
			},
		})
		console.log(req)
		const data = await request.json()
		res.status(200).json(data.photos)
	} catch (error) {
		console.log(error)
	}
}
