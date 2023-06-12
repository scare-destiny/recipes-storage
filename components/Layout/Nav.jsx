import { Box, Center, Text, Button, VStack, useColorModeValue as mode } from '@chakra-ui/react'
import { Navbar } from './Navbar'
import { NavLink } from './NavLink'
import { UserProfile } from './UserProfile'
import { useSession,signIn, signOut } from 'next-auth/react'


export const LoginButton = () => {
	const { data: session } = useSession()
	if (session) {
		return (
			<>
				Signed in as {session.user.email} <br />
				<Button  onClick={() => signOut()}>Sign out</Button>
			</>
		)
	}
	return (
		<>
			<Button mr={{sm:'16px'}} onClick={() => signIn()}>Sign in</Button>
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
					<Center marginEnd='10'>
						<Text>Recipe App</Text>
					</Center>
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
