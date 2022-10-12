import {
	Flex,
	FormControl,
	FormLabel,
	Input,
	Heading,
	Textarea,
	Text,
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
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	useColorModeValue,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { AutoResizeTextarea } from '../components/Layout/AutoResizeTextarea'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { collection, getDocs, addDoc } from 'firebase/firestore/lite'
import { database } from '../firebase'
import categories from '../data/categories'
import { getQueryPhotos } from './api/lib/api'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function AddRecipe({ data }) {
	const { data: session, status } = useSession()

	const isNastyaOrZhenya = () => {
		if (
			session.user.email === 'anastasiya.dyka1994@gmail.com ' ||
			session.user.email === 'zhenya.venger@gmail.com'
		)
			return true
		return false
	}

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

	const [photos, setPhotos] = useState([])
	const [query, setQuery] = useState('')
	const toast = useToast()

	const toggleButtonRef = useRef(null)
	const accordionRef = useRef(null)

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

			toggleButtonRef.current.click()
			toggleButtonRef.current.disabled = true
		}
	}

	const handleImageSelection = (e) => {
		setRecipe({
			...recipe,
			['image']: e.target.src,
		})

		toast({
			title: 'Реді Стеді!',
			description: 'Рецептік до зображення додано 🐎',
			status: 'success',
			duration: 3000,
			isClosable: true,
			position: 'top',
		})
	}

	if (!isNastyaOrZhenya()) {
		return (
			<Container>
				<Text align='center' fontSize='3xl'>
					Sorry, only Nastya can add recipes
				</Text>
			</Container>
		)
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
						templateRows='repeat(2, 1fr)'
						templateColumns={['repeat(1,1fr)', 'repeat(5, 1fr)']}
						gap={2}
						pb={4}
					>
						<GridItem colSpan={[1, 2]}>
							<FormControl>
								<FormLabel htmlFor='title'>Title</FormLabel>
								<Input
									required
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
									required
									name='image'
									type='text'
									placeholder='https://lorem.picsum'
									value={recipe.image}
									onChange={handleChange}
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
									required
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
									required
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
						{/* <GridItem colSpan={[1, 5]}>
							<FormControl>
								<Input
									name='image'
									type='text'
									placeholder='Search Image'
									value={query}
									onChange={(e) => setQuery(e.target.value)}
								></Input>
								<Button
									colorScheme='blue'
									w={['full', 400, 500]}
									mt={4}
									type='submit'
									onClick={handleImageQuery}
								>
									Find Images
								</Button>
							</FormControl>
						</GridItem> */}
						<GridItem colSpan={[1, 4]}></GridItem>
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
			{/* <Accordion p={10} allowToggle>
				<AccordionItem ref={accordionRef}>
					<h2>
						<AccordionButton ref={toggleButtonRef}>
							<Box flex='1' textAlign='left'>
								Images
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel>
						<Box>
							<Flex
								my='1rem'
								justify='center'
								align='left'
								color={useColorModeValue('gray.700', 'gray.900')}
							>
								<Wrap px='1rem' spacing={4} justify='center'>
									{photos.map((pic) => (
										<>
											<WrapItem
												key={pic.id}
												boxShadow='base'
												rounded='20px'
												overflow='hidden'
												bg='white'
												lineHeight='0'
												_hover={{ boxShadow: 'dark-lg' }}
												flexDirection='column'
												alignItems='center'
											>
												<Image
													onClick={handleImageSelection}
													src={pic.src.portrait}
													height={300}
													width={200}
													alt={pic.url}
												/>
												<Text onClick={handleImageSelection} m={4}>
													Click Me ⬆️
												</Text>
											</WrapItem>
										</>
									))}
								</Wrap>
							</Flex>
							<Flex my='1rem' justify='center' align='center' direction='column'>
								<Image
									src='https://images.pexels.com/lib/api/pexels.png'
									height={50}
									width={125}
									alt='recipes image'
								/>
							</Flex>
						</Box>
					</AccordionPanel>
				</AccordionItem>
			</Accordion> */}
		</>
	)
}
