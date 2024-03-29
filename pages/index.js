import { SimpleGrid, Flex, Heading, Button } from '@chakra-ui/react'
import Link from 'next/link'
import Head from 'next/head'
import { RecipeCard } from '../components/RecipeCard'
import Filter from '../components/Filter'
import { RingLoader } from 'react-spinners'
import categories from '../data/categories'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { collection, getDocs } from 'firebase/firestore/lite'
import { database } from '../firebase'

export default function Home() {
	const { data: session, status } = useSession()

	const [filter, setFilter] = useState('')
	const [recipesFetched, setRecipesFetched] = useState(false)
	const [recipes, setRecipes] = useState([])

	async function getRecipes(email) {
		const recipeCollection = collection(database, 'users', email, 'recipes')
		const recipeSnapshot = await getDocs(recipeCollection)
		const recipes = recipeSnapshot.docs.map((doc) => {
			const data = doc.data()
			data.id = doc.id
			return data
		})
		setRecipes(recipes)
		setRecipesFetched(true)
	}

	useEffect(() => {
		if (session && !recipesFetched) {
			getRecipes(session.user.email)
		} else if (!session) {
			getRecipes('zhenya.venger@gmail.com')
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

	if (status === 'loading')
		return (
			<Flex
				justifyContent='center'
				alignItems='center'
				flexDirection='column'
				pt='10'
			>
				<RingLoader className='transform-gpu' color='purple' size={40} />
			</Flex>
		)

	// if (!session) {
	// 	return (
	// 		<>
	// 			<Heading pt='4'>Login to add and edit your recipes</Heading>
	// 			<Button mt='4' colorScheme='purple'>
	// 				<Link href='/addrecipe'>Add recipe</Link>
	// 			</Button>
	// 		</>
	// 	)
	// }

	return (
		<Flex justifyContent='center' alignItems='center' flexDirection='column'>
			<Head>
				<title>Recipe App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<>
				{!session && (
					<Heading as='h4' size='sm' textAlign='center' pt='4'>
						Browse my fav recipes or sign in to add your own
					</Heading>
				)}
				<Filter categories={categories} handleFilterChange={handleFilterChange} />

				<SimpleGrid
					columns={[1, 2, 3]}
					spacing={4}
					initial='hidden'
					animate='visible'
					variants={gridAnimationVariants}
				>
					{recipesToShow.map((recipe, index) => (
						<RecipeCard
							key={`${filter}-${index}`}
							recipe={recipe}
							initial='hidden'
							animate='visible'
							exit='hidden'
							variants={recipeAnimationVariants}
						/>
					))}
				</SimpleGrid>
			</>
		</Flex>
	)
}
