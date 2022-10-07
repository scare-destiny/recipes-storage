import {
	Flex,
	FormControl,
	FormLabel,
	Input,
	Heading,
	Textarea,
	Grid,
	GridItem,
	Button,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
	collection,
	getDocs,
	getDoc,
	doc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore/lite'
import { database } from '../firebase'
import { useState } from 'react'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { useSession } from 'next-auth/react'
import { useToast } from '@chakra-ui/react'

export default function DeleteRecipe() {
	const { data: session, status } = useSession()

	const isNastyaOrZhenya = () => {
		if (
			session.user.email === 'anastasiya.dyka1994@pbsync.com' ||
			session.user.email === 'zhenya.venger@gmail.com'
		) {
			return true
		}
		return false
	}

	const router = useRouter()
	const id = router.query.id
	const [recipe, setRecipe] = useState({})

	const handleSubmit = async (e) => {
		if (isNastyaOrZhenya()) {
			const result = await deleteDoc(doc(database, 'recipes', id))
			router.push('/')
			return
		} else {
			toast({
				title: 'Соррі, ви не можете видалити рецепт',
				description: '',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'center',
			})
		}
	}
	return (
		<Button onClick={handleSubmit} colorScheme='purple' width='40%' type='submit'>
			Delete Recipe
		</Button>
	)
}
