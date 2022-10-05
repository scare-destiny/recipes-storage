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

export default function DeleteRecipe() {
	const router = useRouter()
	const id = router.query.id
	const [recipe, setRecipe] = useState({})

	const handleSubmit = async (e) => {
		const result = await deleteDoc(doc(database, 'recipes', id))
		router.push('/')
	}
	return (
		<Button onClick={handleSubmit} colorScheme='purple' width='30%' type='submit'>
			Delete Recipe
		</Button>
	)
}
