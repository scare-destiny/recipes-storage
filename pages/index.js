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

const MotionSimpleGrid = motion(SimpleGrid)
const MotionRecipeCard = motion(RecipeCard)

export default function Home() {
	const { data: session } = useSession()

	const [filter, setFilter] = useState('')
	const [recipesFetched, setRecipesFetched] = useState(false)
	const [recipes, setRecipes] = useState([])

	useEffect(() => {
		if (session && !recipesFetched) {
			async function getRecipes() {
				const recipeCollection = collection(
					database,
					'users',
					session.user.email,
					'recipes'
				)
				const recipeSnapshot = await getDocs(recipeCollection)
				const recipes = recipeSnapshot.docs.map((doc) => {
					const data = doc.data()
					data.id = doc.id
					return data
				})
				setRecipes(recipes)
				setRecipesFetched(true)
			}
			getRecipes()
		} else if (!session) {
			setRecipesFetched(false)
		}
	}, [session])

	useEffect(() => {
		window.localStorage.setItem('filter', filter)
	}, [filter])

	const filteredRecipes = [...recipes].filter((recipe) =>
		recipe.category.toLowerCase().includes(filter.toLowerCase())
	)

	const recipesToShow = filter !== 'all' ? filteredRecipes : recipes

	const handleFilterChange = ({ target }) => {
		console.log(target.value)
		console.log()
		filter !== target.value ? setFilter(target.value) : setFilter('all')
	}
	const gridAnimationVariants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				delay: 0.5,
				when: 'beforeChildren',
				staggerChildren: 0.1,
			},
		},
	}

	const recipeAnimationVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: {
			opacity: 1,
			scale: 1.5,
			transition: {
				duration: 0.3,
			},
		},
	}
	return (
		<Flex justifyContent='center' alignItems='center' flexDirection='column'>
			<Head>
				<title>Recipe App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{session ? (
				<>
					<Filter categories={categories} handleFilterChange={handleFilterChange} />

					<MotionSimpleGrid
						columns={[1, 2, 3]}
						spacing={4}
						initial='hidden'
						animate='visible'
						variants={gridAnimationVariants}
					>
						{recipesToShow.map((recipe, index) => (
							<MotionRecipeCard
								key={`${filter}-${index}`}
								recipe={recipe}
								initial='hidden'
								animate='visible'
								exit='hidden'
								variants={recipeAnimationVariants}
							/>
						))}
					</MotionSimpleGrid>
				</>
			) : (
				<>
					<Heading pt='4'>Login to add and edit yor recipes</Heading>
					<Button mt='4' colorScheme='purple'>
						<Link href='/addrecipe'>Add recipe</Link>
					</Button>
				</>
			)}
		</Flex>
	)
}
