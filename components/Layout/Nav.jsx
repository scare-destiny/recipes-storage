import { Box, Center, Text, useColorModeValue as mode } from '@chakra-ui/react'
import { Navbar } from './Navbar'
import { NavLink } from './NavLink'
import { UserProfile } from './UserProfile'

export const Nav = () => (
  <Box bg={mode('gray.50', 'gray.700')}>
    <Navbar>
      <Navbar.Brand>
        <Center marginEnd="10">
          <Text>Recipe App</Text>
        </Center>
      </Navbar.Brand>
      <Navbar.Links>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/addrecipe">Add Recipe</NavLink>]
      </Navbar.Links>
      <Navbar.UserProfile>
        <UserProfile
          name="James Perkins"
          avatarUrl="https://pbs.twimg.com/profile_images/1478005071824756739/nVK4l2pR_400x400.jpg"
          email="jamesperkins@hey.com"
        />
      </Navbar.UserProfile>
    </Navbar>
  </Box>
)
