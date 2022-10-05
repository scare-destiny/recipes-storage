import {
	Flex,
	FormControl,
	FormLabel,
	Input,
	Heading,
	Textarea,
	Grid,
	Box,
	Container,
	GridItem,
	Button,
	Select,
	WrapItem,
	IconButton,
	InputGroup,
	InputRightElement,
	useToast,
	Wrap,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { AutoResizeTextarea } from '../components/Layout/AutoResizeTextarea'
import Link from 'next/link'
import { useState } from 'react'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { collection, getDocs, addDoc } from 'firebase/firestore/lite'
import { database } from '../firebase'
import categories from '../data/categories'
import { getCuratedPhotos, getQueryPhotos } from '../lib/api'
import Image from 'next/image'

export async function getServerSideProps() {
	const data = await getCuratedPhotos()
	return {
		props: {
			data,
		},
	}
}

export default function AddRecipe({ data }) {
	const [recipe, setRecipe] = useState({
		title: '',
		description: '',
		ingredients: '',
		instructions: '',
		image: '',
		category: '',
		prepTime: '',
		cookTime: '',
		servings: '',
		calories: '',
	})

	const [photos, setPhotos] = useState(data)
	const [query, setQuery] = useState('')
	const toast = useToast()

	const handleChange = (e) => {
		setRecipe({
			...recipe,
			[e.target.name]: e.target.value,
		})
	}
	const handleSubmit = async (e) => {
		// const firebaseClerkToken = await user.getToken('firebase')
		// const auth = getAuth()
		// await signInWithCustomToken(auth, firebaseClerkToken)

		const result = await addDoc(collection(database, 'recipes'), recipe)

		setRecipe({
			title: '',
			description: '',
			ingredients: '',
			instructions: '',
			image: '',
			category: '',
			prepTime: '',
			cookTime: '',
			servings: '',
			calories: '',
		})
	}

	const handleImageQuery = async (e) => {
		await e.preventDefault()
		if (query == '') {
			toast({
				title: 'Error.',
				description: 'Empty Search',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top',
			})
		} else {
			const res = await getQueryPhotos(query)
			await setPhotos(res)
			await setQuery('')
		}
	}

	return (
		<>
			<Flex justifyContent='center' alignItems='center' flexDirection='column'>
				<Heading as='h1' fontSize='7xl' textAlign='center'>
					Add Recipe
				</Heading>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						handleSubmit()
						alert('Рецептік додано')
					}}
				>
					<Grid
						h='200px'
						templateRows='repeat(2, 1fr)'
						templateColumns={['repeat(1,1fr)', 'repeat(5, 1fr)']}
						gap={2}
					>
						<GridItem colSpan={[1, 2]}>
							<FormControl>
								<FormLabel htmlFor='title'>Title</FormLabel>
								<Input
									name='title'
									type='text'
									placeholder='Awesome Crab Roll'
									value={recipe.title}
									onChange={handleChange}
									isRequired
								/>
							</FormControl>
						</GridItem>
						<GridItem colSpan={[1, 2]}>
							<FormControl>
								<FormLabel htmlFor='image'>Image URL</FormLabel>
								<Input
									name='image'
									type='text'
									placeholder='https://lorem.picsum'
									value={recipe.image}
									onChange={handleChange}
									isRequired
								/>
							</FormControl>
						</GridItem>
						<GridItem colSpan={[1, 2]}>
							<FormControl>
								<FormLabel htmlFor='description'>Description</FormLabel>
								<AutoResizeTextarea
									name='description'
									minH={30}
									placeholder='Tastes how I remember'
									value={recipe.description}
									onChange={handleChange}
								/>
							</FormControl>
						</GridItem>
						<GridItem colSpan={[1, 3]}>
							<FormControl>
								<FormLabel htmlFor='ingredients'>Ingredients</FormLabel>
								<AutoResizeTextarea
									minH={30}
									name='ingredients'
									value={recipe.ingredients}
									onChange={handleChange}
								/>
							</FormControl>
						</GridItem>
						<GridItem colSpan={[1, 5]}>
							<FormControl>
								<FormLabel htmlFor='instructions'>Instructions</FormLabel>
								<AutoResizeTextarea
									name='instructions'
									value={recipe.instructions}
									onChange={handleChange}
								/>
							</FormControl>
						</GridItem>

						<FormControl>
							<FormLabel htmlFor='cookTime'>Cook Time</FormLabel>
							<Input
								name='cookTime'
								type='text'
								placeholder='in minutes'
								value={recipe.cookTime}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor='servings'>Servings</FormLabel>
							<Input
								name='servings'
								type='number'
								placeholder='5'
								value={recipe.servings}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor='calories'>Calories</FormLabel>
							<Input
								name='calories'
								type='number'
								placeholder='300'
								value={recipe.calories}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor='category'>Category</FormLabel>
							<Select name='category' onChange={handleChange}>
								{categories.map((category, index) => (
									<option key={index} value={category}>
										{category}
									</option>
								))}
							</Select>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor='prepTime'>Prep Time</FormLabel>
							<Input
								name='prepTime'
								type='text'
								placeholder='Prep in minutes'
								value={recipe.prepTime}
								onChange={handleChange}
							/>
						</FormControl>
						<GridItem colSpan={[1, 5]}>
							<FormControl>
								<Input
									name='findimage'
									type='text'
									placeholder='Search Image'
									value={query}
									onChange={(e) => setQuery(e.target.value)}
								></Input>
								<Button
									colorScheme='blue'
									width='50%'
									type='submit'
									onClick={handleImageQuery}
								>
									Find Images
								</Button>
							</FormControl>
						</GridItem>
						{/* <GridItem colSpan={[1, 4]}>
					
						</GridItem> */}
						<GridItem colSpan={[1, 2]}>
							<Button colorScheme='purple' width='100%' type='submit'>
								Submit recipe
							</Button>
						</GridItem>
						<GridItem colSpan={[1, 2]}>
							<Link passHref href='/'>
								<Button
									colorScheme='purple'
									variant='outline'
									as='a'
									width='100%'
									type=''
								>
									Cancel
								</Button>
							</Link>
						</GridItem>
					</Grid>
				</form>
			</Flex>
			<Box>
				<Wrap px='1rem' spacing={4} justify='center'>
					{photos.map((pic) => (
						<WrapItem
							key={pic.id}
							boxShadow='base'
							rounded='20px'
							overflow='hidden'
							bg='white'
							lineHeight='0'
							_hover={{ boxShadow: 'dark-lg' }}
						>
							<Link href={`/photos/${pic.id}`}>
								<a>
									<Image src={pic.src.portrait} height={600} width={400} alt={pic.url} />
								</a>
							</Link>
						</WrapItem>
					))}
				</Wrap>
				<Flex my='1rem' justify='center' align='center' direction='column'>
					<Image
						src='https://images.pexels.com/lib/api/pexels.png'
						height={50}
						width={125}
					/>
					<a
						href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
						target='_blank'
						rel='noopener noreferrer'
					>
						Powered by
						<Image
							src='/vercel.svg'
							width={283 / 4}
							height={64 / 4}
							alt='Vercel Logo'
						/>
					</a>
				</Flex>
			</Box>
		</>
	)
}
