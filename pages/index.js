import {
	Box,
	SimpleGrid,
	Flex,
	Button,
	Wrap,
	Container,
} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { RecipeCard } from '../components/RecipeCard'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite'
import { database } from '../firebase'

export default function Home() {
	const [filter, setFilter] = useState('')

	const [recipes, setRecipes] = useState([])
	useEffect(() => {
		async function getRecipes() {
			const recipeCollection = collection(database, 'recipes')
			const recipeSnapshot = await getDocs(recipeCollection)
			const recipes = recipeSnapshot.docs.map((doc) => {
				const data = doc.data()
				data.id = doc.id
				return data
			})
			setRecipes(recipes)
		}
		getRecipes()
	}, [])

	const filteredRecipes = [...recipes].filter((recipe) =>
		recipe.category.toLowerCase().includes(filter.toLowerCase())
	)

	return (
		<Flex justifyContent='center' alignItems='center' flexDirection='column'>
			<Head>
				<title>Recipe App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Flex />

			<Wrap
				justifyContent='center'
				align='center'
				gap={4}
				p='6'
				direction='row'
				maxW='100vw'
				wrap
			>
				<Button onClick={() => setFilter('')}>All</Button>
				<Button onClick={() => setFilter('pasta')}>Pasta</Button>
				<Button onClick={() => setFilter('Veggies')}>Veggies</Button>
				<Button onClick={() => setFilter('Appetizers')}>Appetizers</Button>
				<Button onClick={() => setFilter('Salads')}>Salads</Button>
				<Button onClick={() => setFilter('Breakfast')}>Breakfast</Button>
				<Button onClick={() => setFilter('Dinner')}>Dinner</Button>
			</Wrap>

			<SimpleGrid columns={[1, 2, 3]} spacing={4}>
				{filteredRecipes.map((recipe, index) => (
					<RecipeCard key={index} recipe={recipe} />
				))}
			</SimpleGrid>
		</Flex>
	)
}
