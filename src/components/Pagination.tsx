import { useProductsListContext } from '@/utils/contexts/ProductsListContext'
import { Button, Flex, Select, Text } from '@chakra-ui/react'
import { FC } from 'react'

const Pagination: FC = () => {
  const { page, setPage, totalElements, totalPages, size, setSize, isLoading } =
    useProductsListContext()

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(event.target.value))
    setPage(0)
  }

  return (
    <Flex
      justify='center'
      align='center'
      mt={4}
      gap={4}
      marginTop={'auto'}
    >
      <Button
        size='sm'
        onClick={() => handlePageChange(0)}
        isDisabled={page === 0}
      >
        First 🙏
      </Button>

      <Button
        size='sm'
        onClick={() => handlePageChange(page - 1)}
        isDisabled={page === 0}
      >
        Previous 🤫
      </Button>

      <Text>{!isLoading ? `Page ${page + 1} of ${totalPages}` : '-----------'}</Text>

      <Button
        size='sm'
        onClick={() => handlePageChange(page + 1)}
        isDisabled={page >= totalPages - 1}
      >
        Next 🥵
      </Button>

      <Button
        size='sm'
        onClick={() => handlePageChange(totalPages - 1)}
        isDisabled={page >= totalPages - 1}
      >
        Last 👩‍🎤
      </Button>

      <Select
        size='sm'
        width='200px'
        value={size}
        onChange={handleSizeChange}
      >
        <option value={5}>Отображать по 5</option>
        <option value={10}>Отображать по 10</option>
        <option value={20}>Отображать по 20</option>
        <option value={50}>Отображать по 50</option>
      </Select>

      <Text fontSize='sm'>Всего продуктов: {isLoading ? '---' : totalElements}</Text>
    </Flex>
  )
}

export { Pagination }
