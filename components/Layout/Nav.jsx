import { Link } from 'next/link'
import { Box, Center, Text, Button, useColorModeValue as mode } from '@chakra-ui/react'
import { Navbar } from './Navbar'
import { NavLink } from './NavLink'
import { UserProfile } from './UserProfile'
import { useSession,signIn, signOut } from 'next-auth/react'


export const LoginButton = () => {
	const { data: session } = useSession()
	if (session) {
		return (
			<>
				<Button  onClick={() => signOut()}>Sign out</Button>
			</>
		)
	}
	return (
		<>
			<Button onClick={() => signIn()}>Sign in</Button>
		</>
	)
}

export const Nav = () => {
	const { data: session, status } = useSession()

	const avatar =
		status === 'authenticated' ? session.user.image : ''
	const email =
		status === 'authenticated' ? session.user.email : ''
	const name = 
	status === 'authenticated' ? session.user.name : 'Funny stranger'
	return (
		<Box bg={mode('gray.50', 'gray.700')}>
			<Navbar>
				<Navbar.Brand>
					<Link href='/' passHref> 
						<Center marginEnd='10'>
							<Text>Recipe App</Text>
						</Center>
					</Link>
					<LoginButton/>
				</Navbar.Brand>
				<Navbar.Links>
					<NavLink href='/'>Home</NavLink>
					<NavLink href='/addrecipe'>Add Recipe</NavLink>
				</Navbar.Links>

				<Navbar.UserProfile>
					<UserProfile
						name={name}
						avatarUrl={avatar}
						email={email}
					/>

				</Navbar.UserProfile>
			</Navbar>
		</Box>
	)
}
