import { Box, Center, Text, useColorModeValue as mode } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { NavLink } from "./NavLink";
import { UserProfile } from "./UserProfile";

export const Nav = () => (
  <Box bg={mode("gray.50", "gray.700")}>
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
          name="Eugene Venger"
          avatarUrl="https://cdnb.artstation.com/p/assets/images/images/044/872/909/large/batu-unutmaz-aangwmfn.jpg?1641374544"
          email="zhenya.venger@gmail.com"
        />
      </Navbar.UserProfile>
    </Navbar>
  </Box>
);
