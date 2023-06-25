import { Wrap, useColorModeValue, Button } from '@chakra-ui/react'

const Filter = ({ categories, handleFilterChange }) => {
	return (
		<Wrap gap={4} p='6' direction='row' maxW='100vw' justify='center'>
			{categories.map((category, id) => (
				<Button
					key={id}
					value={category}
					onClick={handleFilterChange}
					_dark={{ color: 'black' }}
				>
					{category}
				</Button>
			))}
		</Wrap>
	)
}

export default Filter
