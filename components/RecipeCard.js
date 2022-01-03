import {
  Flex,
  Box,
  Image,
  chakra,
  useColorModeValue,
  Link
} from '@chakra-ui/react'
import Nextlink from 'next/link'
export const RecipeCard = ({ recipe }) => {
  const { title, description, image, category, calories, id, cookTime } = recipe
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.800')}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx="auto"
        rounded="lg"
        shadow="md"
        bg={useColorModeValue('gray.100', 'gray.600')}
        maxW="2xl"
      >
        <Image
          roundedTop="lg"
          w="full"
          h={64}
          fit="cover"
          src={image}
          alt={title}
        />

        <Box p={6}>
          <Box>
            <chakra.span
              fontSize="xs"
              textTransform="uppercase"
              color={useColorModeValue('gray.600', 'white')}
            >
              {category}
            </chakra.span>
            <Nextlink passHref href={`/recipes/${id}`}>
              <Link
                display="block"
                color={useColorModeValue('gray.800', 'white')}
                fontWeight="bold"
                fontSize="2xl"
                mt={2}
                _hover={{ color: 'gray.600', textDecor: 'underline' }}
              >
                {title}
              </Link>
            </Nextlink>
            <chakra.p
              mt={2}
              fontSize="sm"
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              {description}
            </chakra.p>
          </Box>

          <Box mt={4}>
            <Flex alignItems="center">
              <Flex alignItems="center">
                <Box
                  mx={2}
                  fontWeight="bold"
                  color={useColorModeValue('gray.700', 'gray.200')}
                >
                  Calories per serving
                </Box>
              </Flex>
              <chakra.span
                mx={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                {calories}
              </chakra.span>
            </Flex>
          </Box>
          <Box mt={4}>
            <Flex alignItems="center">
              <Flex alignItems="center">
                <Box
                  mx={2}
                  fontWeight="bold"
                  color={useColorModeValue('gray.700', 'gray.200')}
                >
                  Cook Time
                </Box>
              </Flex>
              <chakra.span
                mx={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                {cookTime}
              </chakra.span>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}
