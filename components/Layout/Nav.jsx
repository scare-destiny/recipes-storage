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
				<Button  variant='outline' onClick={() => signOut()}>Sign out</Button>
			</>
		)
	}
	return (
		<>
			<Button  variant='outline' onClick={() => signIn()}>Sign in</Button>
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
							<NavLink href='/'>Recipe App</NavLink>
						</Center>
				</Navbar.Brand>
				<Navbar.Links>
					<LoginButton/>
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
