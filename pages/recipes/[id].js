import {
	Flex,
	Box,
	Button,
	chakra,
	Image,
	useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore/lite'
import { database } from '../../firebase'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import DeleteRecipe from '../../components/DeleteRecipe'
export default function Recipe({ recipe }) {
	const { title, description, ingredients, instructions, image, category } =
		recipe

	return (
		<Flex
			bg={useColorModeValue('white', 'gray.800')}
			p={10}
			w='full'
			alignItems='center'
			justifyContent='center'
		>
			<Box
				mx='auto'
				rounded='lg'
				shadow='md'
				width='100%'
				bg={useColorModeValue('gray.100', 'gray.600')}
				maxW='xl'
			>
				<Image roundedTop='lg' w='full' fit='' src={image} alt={title} />
				<Box p={6}>
					<Box>
						<chakra.span
							fontSize='xs'
							textTransform='uppercase'
							color={useColorModeValue('gray.600', 'white')}
						>
							{category}
						</chakra.span>
						<Box
							display='block'
							color={useColorModeValue('gray.800', 'white')}
							fontWeight='bold'
							fontSize='2xl'
							mt={2}
							_hover={{ color: 'gray.600', textDecor: 'underline' }}
						>
							{title}
						</Box>
						<chakra.p
							mt={2}
							fontSize='sm'
							color={useColorModeValue('gray.600', 'gray.400')}
						>
							{description}
						</chakra.p>
					</Box>
					<Box mt={6}>
						<Box>
							<chakra.span
								fontSize='lg'
								fontWeight={500}
								color={useColorModeValue('gray.600', 'gray.400')}
							>
								Ingredients
							</chakra.span>
							<chakra.ul
								mt={2}
								mx={8}
								fontSize='sm'
								color={useColorModeValue('gray.600', 'gray.400')}
							>
								{ingredients.split('\n').map((ingredient, index) => (
									<chakra.li key={index}>{ingredient}</chakra.li>
								))}
							</chakra.ul>
							<chakra.p></chakra.p>
						</Box>
						<Box mt={6}>
							<chakra.span
								fontSize='lg'
								fontWeight={500}
								color={useColorModeValue('gray.600', 'gray.400')}
							>
								Instructions
							</chakra.span>
							<chakra.ol
								mt={2}
								mx={8}
								fontSize='sm'
								color={useColorModeValue('gray.600', 'gray.400')}
							>
								{instructions.split('\n').map((instruction, index) => (
									<chakra.p key={index}>{instruction}</chakra.p>
								))}
							</chakra.ol>
						</Box>
					</Box>
				</Box>
				<Flex justifyContent='space-between' p={4}>
					<Link
						passHref
						href={{ pathname: '/editrecipe', query: { id: recipe.id } }}
					>
						<Button as='a' variant='ghost'>
							{' '}
							Edit Recipe{' '}
						</Button>
					</Link>
					<DeleteRecipe />
				</Flex>
			</Box>
		</Flex>
	)
}

export async function getServerSideProps(context) {
	const session = await getServerSession(context.req, context.res, authOptions)

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	const id = context.params.id
	const userEmail = session.user.email
	const userRef = doc(database, 'users', userEmail)
	const recipeRef = doc(userRef, 'recipes', id)
	const recipeSnapshot = await getDoc(recipeRef)
	const recipe = recipeSnapshot.data()
	recipe.id = recipeSnapshot.id

	return {
		props: {
			recipe,
		},
	}
}
