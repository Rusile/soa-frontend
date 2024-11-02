import { SORT_FIELD } from '@/api/types'
import { useProductsListContext } from '@/utils/contexts/ProductsListContext'
import { Stack, Flex, Button } from '@chakra-ui/react'
import { FC } from 'react'

const SortManager: FC = () => {
  const { sortBy, setSortBy } = useProductsListContext()

  const handleToggleSort = (field: SORT_FIELD) => {
    setSortBy((prev) => {
      if (prev.includes(field)) {
        return prev.filter((f) => f !== field)
      }
      return [...prev, field]
    })
  }

  return (
    <Stack spacing={4}>
      <Flex
        wrap='wrap'
        gap={2}
      >
        {Object.values(SORT_FIELD).map((field) => (
          <Button
            key={field}
            size='sm'
            variant={sortBy.includes(field) ? 'solid' : 'outline'}
            border={'1px solid'}
            borderColor={'gray.200'}
            onClick={() => handleToggleSort(field)}
          >
            {field.replace(/_/g, ' ')}
          </Button>
        ))}
      </Flex>
    </Stack>
  )
}

export { SortManager }
