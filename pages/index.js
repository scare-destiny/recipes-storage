import { Box, SimpleGrid, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { RecipeCard } from '../components/RecipeCard'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
export default function Home() {
  const [recipes, setRecipes] = useState([
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
      cookTime: '20 minutes',
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
  ])
  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Head>
        <title>Recipe App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </SimpleGrid>
    </Flex>
  )
}
