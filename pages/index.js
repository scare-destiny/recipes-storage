import { SimpleGrid, Flex, Heading, Button } from '@chakra-ui/react'
import Link from 'next/link'
import Head from 'next/head'
import { RecipeCard } from '../components/RecipeCard'
import Filter from '../components/Filter'
import categories from '../data/categories'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { collection, getDocs } from 'firebase/firestore/lite'
import { database } from '../firebase'
import { motion } from 'framer-motion'

export default function Home() {
	const { data: session } = useSession()

	const [filter, setFilter] = useState('')
	// const [recipesFetched, setRecipesFetched] = useState(false)
	const [recipes, setRecipes] = useState([])

	async function getRecipes(email) {
		const recipeCollection = collection(database, 'users', email, 'recipes')
		const recipeSnapshot = await getDocs(recipeCollection)
		const recipes = recipeSnapshot.docs.map((doc) => {
			const data = doc.data()
			data.id = doc.id
			return data
		})
		console.log(`recipes are ${recipes}`)
		setRecipes(recipes)

		// setRecipesFetched(true)
	}

	useEffect(() => {
		if (session) {
			getRecipes(session.user.email)
			setRecipes(recipes)
		} else {
			// setRecipesFetched(false)
			getRecipes('zhenya.venger@gmail.com')
			setRecipes(recipes)
		}
	}, [])

	useEffect(() => {
		window.localStorage.setItem('filter', filter)
	}, [filter])

	const filteredRecipes = [...recipes].filter((recipe) =>
		recipe.category.toLowerCase().includes(filter.toLowerCase())
	)

	const recipesToShow = filter !== 'all' ? filteredRecipes : recipes

	const handleFilterChange = ({ target }) => {
		filter !== target.value ? setFilter(target.value) : setFilter('all')
	}

	return (
		<Flex justifyContent='center' alignItems='center' flexDirection='column'>
			<Head>
				<title>Recipe App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<>
				<Filter categories={categories} handleFilterChange={handleFilterChange} />

				<SimpleGrid
					columns={[1, 2, 3]}
					spacing={4}
					initial='hidden'
					animate='visible'
				>
					{recipesToShow.map((recipe, index) => (
						<RecipeCard
							key={`${filter}-${index}`}
							recipe={recipe}
							initial='hidden'
							animate='visible'
							exit='hidden'
						/>
					))}
				</SimpleGrid>
			</>
		</Flex>
	)
}
