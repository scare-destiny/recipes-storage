import {Flex, Box, Link, chakra, Image, useColorModeValue} from '@chakra-ui/react'

export default function Recipe ({recipe}) {
    console.log(recipe)
    const {
        title,
        description,
        ingredients,
        instructions,
        image,
        category,
    } = recipe;

    return (
        <Flex
            bg={useColorModeValue("#F9FAFB", "gray.600")}
            p={10}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                mx="auto"
                rounded="lg"
                shadow="md"
                minW="3xl"
                bg={useColorModeValue("white", "gray.800")}
                maxW="5xl"
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
                    <Box mt={6}>
                        <Box>
                            <chakra.span
                                fontSize="lg" 
                                fontWeight={500}
                                color={useColorModeValue("gray.600", "gray.400")}
                            >
                                Ingredients
                            </chakra.span>
                            <chakra.ul
                                mt={2}
                                mx={8}
                                fontSize="sm"
                                color={useColorModeValue("gray.600", "gray.400")}
                            >
                                {ingredients.split(',').map((ingredient, index) => (
                                    <chakra.li key={index}>
                                        {ingredient}
                                    </chakra.li> 
                                ))}
                            </chakra.ul>
                        </Box>
                        <Box mt={6}>
                            <chakra.span
                                fontSize="lg" 
                                fontWeight={500}
                                color={useColorModeValue("gray.600", "gray.400")}
                            >
                                Instructions
                            </chakra.span>
                            <chakra.ol
                                mt={2}
                                mx={8}
                                fontSize="sm"
                                color={useColorModeValue("gray.600", "gray.400")}
                            >
                                {instructions.split(',').map((instruction, index) => (
                                    <chakra.li key={index}>
                                        {instruction}
                                    </chakra.li>
                                ))}
                            </chakra.ol>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
}








export async function getStaticProps({params}) {
    const id = params.id;
    const recipes = [
        {
            title: 'Awesome Crab Roll',
            description: 'Tastes how I remember',
            ingredients: 'Crab, Rice, Salt, Pepper',
            instructions: 'Mix ingredients, roll, bake',
            image: 'https://picsum.photos/seed/picsum/1920/1080',
            category: 'Appetizer',
            prepTime: '10 minutes',
            cookTime: '20 minutes',
            servings: '4',
            calories: '200',
          },
          {
            title: 'Pizza',
            description: 'super tastey',
            ingredients: 'Pizza, Cheese, Salt, Pepper',
            instructions: 'Mix ingredients, roll, bake',
            image: 'https://picsum.photos/seed/picsum/1920/1080',
            category: 'Appetizer',
            prepTime: '10 minutes',
            cookTime: '20 minutes',
            servings: '4',
            calories: '200',
          },
          {
            title: 'hot dog',
            description: 'tastes how I remember',
            ingredients: 'hot dog, ketchup, mustard',
            instructions: 'Mix ingredients, roll, bake',
            image: 'https://picsum.photos/seed/picsum/1920/1080',
            category: 'Appetizer',
            prepTime: '10 minutes',
            cookTime: '20 minutes',
            servings: '4',
            calories: '200',
          },
          {
            title: 'chicken',
            description: 'tastes how I remember',
            ingredients: 'chicken, rice, salt, pepper',
            instructions: 'Mix ingredients, roll, bake',
            image: 'https://picsum.photos/seed/picsum/1920/1080',
            category: 'Appetizer',
            prepTime: '10 minutes',
            cookTime: '20 minutes',
            servings: '4',
            calories: '200',
          },
        ]
        
        const recipe = recipes.find(recipe => recipe.title === id)
        console.log(recipe)
        return {
            props: {
                recipe
            }
        }
}








export async function getStaticPaths() {
    const recipes = [
        {
            title: 'Awesome Crab Roll',
            description: 'Tastes how I remember',
            ingredients: 'Crab, Rice, Salt, Pepper',
            instructions: 'Mix ingredients, roll, bake',
            image: 'https://picsum.photos/seed/picsum/1920/1080',
            category: 'Appetizer',
            prepTime: '10 minutes',
            cookTime: '20 minutes',
            servings: '4',
            calories: '200',
          },
          {
            title: 'Pizza',
            description: 'super tastey',
            ingredients: 'Pizza, Cheese, Salt, Pepper',
            instructions: 'Mix ingredients, roll, bake',
            image: 'https://picsum.photos/seed/picsum/1920/1080',
            category: 'Appetizer',
            prepTime: '10 minutes',
            cookTime: '20 minutes',
            servings: '4',
            calories: '200',
          },
          {
            title: 'hot dog',
            description: 'tastes how I remember',
            ingredients: 'hot dog, ketchup, mustard',
            instructions: 'Mix ingredients, roll, bake',
            image: 'https://picsum.photos/seed/picsum/1920/1080',
            category: 'Appetizer',
            prepTime: '10 minutes',
            cookTime: '20 minutes',
            servings: '4',
            calories: '200',
          },
          {
            title: 'chicken',
            description: 'tastes how I remember',
            ingredients: 'chicken, rice, salt, pepper',
            instructions: 'Mix ingredients, roll, bake',
            image: 'https://picsum.photos/seed/picsum/1920/1080',
            category: 'Appetizer',
            prepTime: '10 minutes',
            cookTime: '20 minutes',
            servings: '4',
            calories: '200',
          },
        ]
        const paths = recipes.map(recipe => ({
            params: {
                id: recipe.title
            }
        }))
    return {
        paths,
        fallback: false
    }
    }