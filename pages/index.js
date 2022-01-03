import { Box, SimpleGrid,Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { RecipeCard } from '../components/RecipeCard'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
export default function Home() {
  const [recipes, setRecipes] = useState([
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
  ]);
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



