import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Nav } from '../components/Layout/Nav'

const publicPages = ['/', `/recipes/[id]`]

function MyApp({ Component, pageProps }) {
	const { pathname } = useRouter()
	const isPublicPage = publicPages.includes(pathname)

	return (
		<ChakraProvider>
			{isPublicPage ? (
				<>
					<Nav />
					<Component {...pageProps} />
				</>
			) : (
				<>
					<Nav />
					<Component {...pageProps} />
				</>
			)}
		</ChakraProvider>
	)
}

export default MyApp
