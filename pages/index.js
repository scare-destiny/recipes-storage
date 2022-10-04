import {
	Box,
	SimpleGrid,
	Flex,
	Button,
	Wrap,
	Container,
} from '@chakra-ui/react'
import Head from 'next/head'
import { RecipeCard } from '../components/RecipeCard'
import Filter from '../components/Filter'
import categories from '../data/categories'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite'
import { database } from '../firebase'
import LoginButton from '../components/login-btn'

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
			console.log(recipes)
		}
		getRecipes()
	}, [])

	useEffect(() => {
		window.localStorage.setItem('filter', filter)
	}, [filter])

	const filteredRecipes = [...recipes].filter((recipe) =>
		recipe.category.toLowerCase().includes(filter.toLowerCase())
	)

	const recipesToShow = filter !== 'all' ? filteredRecipes : recipes

	return (
		<Flex justifyContent='center' alignItems='center' flexDirection='column'>
			<Head>
				<title>Recipe App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Filter
				categories={categories}
				handleFilterChange={({ target }) => setFilter(target.value)}
			/>
			<SimpleGrid columns={[1, 2, 3]} spacing={4}>
				{recipesToShow.map((recipe, index) => (
					<RecipeCard key={index} recipe={recipe} />
				))}
			</SimpleGrid>
		</Flex>
	)
}
