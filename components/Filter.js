import { Wrap, WrapItem, Button } from '@chakra-ui/react'

const Filter = () => {
	return (
		<Wrap gap={4} p='6' direction='row' maxW='100vw' justify='center'>
				<Button onClick={() => setFilter('')}>All</Button>
				<Button onClick={() => setFilter('pasta')}>Pasta</Button>
				<Button onClick={() => setFilter('Veggies')}>Veggies</Button>
				<Button onClick={() => setFilter('Appetizers')}>Appetizers</Button>
				<Button onClick={() => setFilter('Salads')}>Salads</Button>
				<Button onClick={() => setFilter('Breakfast')}>Breakfast</Button>
				<Button onClick={() => setFilter('Dinner')}>Dinner</Button>
	
		</Wrap>
	)
}

export default Filter
