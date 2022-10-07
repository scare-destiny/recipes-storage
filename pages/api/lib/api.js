const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY
import Cors from 'cors'

const cors = Cors({
	methods: ['GET', 'HEAD'],
})

export const getQueryPhotos = async (query) => {
	const res = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
		mode: 'no-cors',
		method: 'GET',
		credentials: 'include',
		headers: {
			Authorization: API_KEY,
		},
	})
	const responseJson = await res.json()
	return responseJson.photos
}
