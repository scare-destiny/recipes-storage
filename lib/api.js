const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY

export const getCuratedPhotos = async () => {
	const res = await fetch(`https://api.pexels.com/v1/curated?per_page=8`, {
		headers: {
			Authorization: API_KEY,
		},
	})
	const responseJson = await res.json()
	return responseJson.photos
}

export const getQueryPhotos = async (query) => {
	const res = await fetch(
		`https://api.pexels.com/v1/search?query=${query}&per_page=8`,
		{
			headers: {
				Authorization: API_KEY,
			},
		}
	)
	const responseJson = await res.json()
	return responseJson.photos
}
