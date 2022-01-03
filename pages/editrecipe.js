import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Textarea,
  Grid,
  GridItem,
  Button
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState } from 'react'

export default function EditRecipe() {
  const router = useRouter()
  const id = router.query.id
  const recipes = [
    {
      id: '4',
      title: 'Awesome Crab Roll',
      description: 'Tastes just like mom used to make',
      ingredients: 'Crab, Rice, Salt, Pepper',
      instructions: 'Mix ingredients, roll, bake',
      image:
        'https://res.cloudinary.com/dub20ptvt/image/upload/v1641217989/Recipe%20App/yzt6ekukk0tvt4ipj9rg.jpg',
      category: 'Appetizer',
      prepTime: '10 minutes',
      cookTime: '500 minutes',
      servings: '4',
      calories: '200'
    },
    {
      id: '3',
      title: 'Pizza',
      description: 'super tastey',
      ingredients: 'Pizza crust, Cheese, Sauce, Pepper',
      instructions: 'Top crust with sauce, add your cheese, bake, eat',
      image:
        'https://res.cloudinary.com/dub20ptvt/image/upload/v1641217990/Recipe%20App/kn24c9af1suukkh5dvww.jpg',
      category: 'Appetizer',
      prepTime: '10 minutes',
      cookTime: '20 minutes',
      servings: '4',
      calories: '200'
    },
    {
      id: '2',
      title: 'hot dog',
      description: 'Tastes like freedom',
      ingredients: 'hot dog, ketchup, mustard',
      instructions:
        'Take hot dog,cook on grill, put ketchup on top, put mustard on top',
      image:
        'https://res.cloudinary.com/dub20ptvt/image/upload/v1641217990/Recipe%20App/swzgd7lqpfsil9a045ri.jpg',
      category: 'Appetizer',
      prepTime: '10 minutes',
      cookTime: '20 minutes',
      servings: '4',
      calories: '200'
    },
    {
      id: '1',
      title: 'chicken',
      description: 'Great for meal prepping, super quick and easy',
      ingredients: 'chicken, salt, pepper',
      instructions:
        'Trim fat, put a bunch of salt and pepper on it, and cook it',
      image:
        'https://res.cloudinary.com/dub20ptvt/image/upload/v1641217990/Recipe%20App/dnhuxb6uaoiytrbyka3g.jpg',
      category: 'Appetizer',
      prepTime: '10 minutes',
      cookTime: '20 minutes',
      servings: '4',
      calories: '200'
    }
  ]
  const [recipe, setRecipe] = useState(recipes.find(r => r.id === id))
  console.log(recipe)
  const handleChange = e => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Heading as="h1" fontSize="7xl" textAlign="center">
        Edit Recipe
      </Heading>
      <form
        onSubmit={e => {
          e.preventDefault()
          console.log(recipe)
        }}
      >
        <Grid
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={2}
        >
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                name="title"
                type="text"
                placeholder="Awesome Crab Roll"
                value={recipe?.title || ''}
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel htmlFor="image">Image URL</FormLabel>
              <Input
                name="image"
                type="text"
                placeholder="https://lorem.picsum"
                value={recipe?.image || ''}
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                name="description"
                placeholder="Tastes how I remember"
                value={recipe?.description || ''}
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={3}>
            <FormControl>
              <FormLabel htmlFor="ingredients">Ingredients</FormLabel>
              <Textarea
                name="ingredients"
                value={recipe?.ingredients || ''}
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={5}>
            <FormControl>
              <FormLabel htmlFor="instructions">Instructions</FormLabel>
              <Textarea
                name="instructions"
                value={recipe?.instructions || ''}
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>

          <FormControl>
            <FormLabel htmlFor="cookTime">Cook Time</FormLabel>
            <Input
              name="cookTime"
              type="text"
              placeholder="in minutes"
              value={recipe?.cookTime}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="servings">Servings</FormLabel>
            <Input
              name="servings"
              type="number"
              placeholder="5"
              value={recipe?.servings || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="calories">Calories</FormLabel>
            <Input
              name="calories"
              type="number"
              placeholder="300"
              value={recipe?.calories || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Input
              name="category"
              type="text"
              placeholder="Asian"
              value={recipe?.category || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="prepTime">Prep Time</FormLabel>
            <Input
              name="prepTime"
              type="text"
              placeholder="Prep in minutes"
              value={recipe?.prepTime || ''}
              onChange={handleChange}
            />
          </FormControl>
          <GridItem colSpan={2}>
            <Button colorScheme="purple" width="100%" type="submit">
              Submit
            </Button>
          </GridItem>
          <GridItem colSpan={2}>
            <Link passHref href="/">
              <Button
                colorScheme="purple"
                variant="outline"
                as="a"
                width="100%"
                type=""
              >
                Cancel
              </Button>
            </Link>
          </GridItem>
        </Grid>
      </form>
    </Flex>
  )
}
