import path from 'path'

export default async function handler(req, res) {
	// Check for secred to confirm this is a valid request
	if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
		return res.status(401).json({ message: 'Invalid token' })
	}

	try {
		await res.revalidate(path.join('/', req.body.data.slug))
		return res.status(200).json({ revalidated: true })
	} catch (error) {
		return res.status(500).json({ error: `error revalidating ${error.message}` })
	}
}
