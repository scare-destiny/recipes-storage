import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Nav } from '../components/Layout/Nav'
import { SessionProvider, useSession } from 'next-auth/react'

const publicPages = ['/', `/recipes/[id]`]

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const { pathname } = useRouter()
	const isPublicPage = publicPages.includes(pathname)

	return (
		<SessionProvider session={session}>
			<ChakraProvider>
				{isPublicPage ? (
					<>
						<Nav />
						<Component {...pageProps} />
					</>
				) : (
					<>
						{/* <LoginButton /> */}
						<Auth>
							<Nav />
							<Component {...pageProps} />
						</Auth>
					</>
				)}
			</ChakraProvider>
		</SessionProvider>
	)
}

function Auth({ children }) {
	// if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
	const { status } = useSession({ required: true })

	if (status === 'loading') {
		return <div>Loading...</div>
	}

	return children
}

export default MyApp
