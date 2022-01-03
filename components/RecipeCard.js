import {Flex,Box,Image, chakra,useColorModeValue,Link} from "@chakra-ui/react"

export const  RecipeCard = ({recipe}) => {

    const {title ,
    description,
    image, 
    category, 
    calories} = recipe;
    return (
      <Flex
        bg={useColorModeValue("#F9FAFB", "gray.600")}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          mx="auto"
          rounded="lg"
          shadow="md"
          bg={useColorModeValue("white", "gray.800")}
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
                color={useColorModeValue("brand.600", "brand.400")}
              >
                {category}
              </chakra.span>
              <Link
                display="block"
                color={useColorModeValue("gray.800", "white")}
                fontWeight="bold"
                href={`/recipes/${title}`}
                fontSize="2xl"
                mt={2}
                _hover={{ color: "gray.600", textDecor: "underline" }}
                
              >
                {title}
              </Link>
              <chakra.p
                mt={2}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {description}
              </chakra.p>
            </Box>
  
            <Box mt={4}>
              <Flex alignItems="center">
                <Flex alignItems="center">
                  <Link
                    mx={2}
                    fontWeight="bold"
                    color={useColorModeValue("gray.700", "gray.200")}
                    
                  >
                    Calories per serving
                  </Link>
                </Flex>
                <chakra.span
                  mx={1}
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.300")}
                >
                  {calories}
                </chakra.span>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
    );
  };
