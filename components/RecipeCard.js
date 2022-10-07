import {
	Flex,
	Box,
	Image,
	chakra,
	useColorModeValue,
	Link,
} from '@chakra-ui/react'
import Nextlink from 'next/link'
export const RecipeCard = ({ recipe }) => {
	const { title, description, image, category, calories, id, cookTime } = recipe
	return (
		<Flex
			bg={useColorModeValue('white', 'gray.800')}
			p={30}
			// w={[300, 400, 500]}
			alignItems='center'
			justifyContent='center'
		>
			<Box
				mx='auto'
				rounded='lg'
				shadow='md'
				bg={useColorModeValue('gray.100', 'gray.600')}
				maxW='2xl'
				w='300px'
			>
				<Image
					roundedTop='lg'
					w='full'
					h={64}
					fit='cover'
					src={image}
					alt={title}
				/>

				<Box p={6}>
					<Box h={130}>
						<chakra.span
							fontSize='xs'
							textTransform='uppercase'
							color={useColorModeValue('gray.600', 'white')}
						>
							{category}
						</chakra.span>
						<Nextlink passHref href={`/recipes/${id}`}>
							<Link
								display='block'
								color={useColorModeValue('gray.800', 'white')}
								fontWeight='bold'
								fontSize='xl'
								mt={2}
								_hover={{ color: 'gray.600', textDecor: 'underline' }}
							>
								{title}
							</Link>
						</Nextlink>
						{/* <chakra.p
							mt={2}
							fontSize='sm'
							color={useColorModeValue('gray.600', 'gray.400')}
						>
							{description}
						</chakra.p> */}
					</Box>				</Box>
			</Box>
		</Flex>
	)
}
