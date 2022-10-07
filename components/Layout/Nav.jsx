import { Box, Center, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { Navbar } from './Navbar'
import { NavLink } from './NavLink'
import { UserProfile } from './UserProfile'
import { useSession } from 'next-auth/react'

export const Nav = () => {
	const { data: session, status } = useSession()

	const avatar =
		status === 'authenticated' ? session.user.image : 'https://i.imgur.com/K9qRrGP.png'
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
				</Navbar.Brand>
				<Navbar.Links>
					<NavLink href='/'>Home</NavLink>
					<NavLink href='/addrecipe'>Add Recipe</NavLink>]
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
