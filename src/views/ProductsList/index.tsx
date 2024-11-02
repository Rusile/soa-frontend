import { Controls } from '@/components/Controls'
import { Loader } from '@/components/Loader'
import { Pagination } from '@/components/Pagination'
import { ProductCard } from '@/components/ProductCard'
import { routes } from '@/router/routes'
import { useProductsListContext } from '@/utils/contexts/ProductsListContext'
import { useMinPriceProduct } from '@/utils/hooks/useMinPriceProduct'

import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { FC, Fragment } from 'react'
import { MdLaunch } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const ProductsList: FC = () => {
  const { isLoading, productsList, totalElements } = useProductsListContext()
  const { data: poorData } = useMinPriceProduct()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()

  return (
    <Fragment>
      <Flex
        width={'100%'}
        flexDirection={'column'}
        gap={10}
        paddingX={10}
        paddingBottom={10}
      >
        <Text
          width={'100%'}
          textAlign={'center'}
          fontSize={28}
          fontWeight={600}
        >
          Всего: {isLoading ? '---' : totalElements} продуктов 👇🤯
        </Text>
        <Controls />
        {isLoading && productsList.length === 0 ? (
          <Loader />
        ) : (
          <Flex
            flexWrap={'wrap'}
            gap={2}
          >
            {productsList.map((item) => (
              <ProductCard
                key={item.id}
                productData={item}
              />
            ))}
          </Flex>
        )}
        <Pagination />
      </Flex>
      {poorData && (
        <Button
          position={'absolute'}
          top={4}
          left={4}
          onClick={onOpen}
        >
          Показать самый дешевый продукт 🥣
        </Button>
      )}

      {poorData && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>САМЫЙ ДЕШЕВЫЙ ПРОДУКТ 😈</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ProductCard
                productData={poorData}
                key={poorData.id}
                // ^ ход гения ребят.
              />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme='blue'
                width={'full'}
                onClick={onClose}
              >
                Спасибо 🙏
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Button
        position={'absolute'}
        top={4}
        right={4}
        rightIcon={<Icon as={MdLaunch} />}
        onClick={() => navigate(routes.search)}
      >
        Страница поиска
      </Button>
    </Fragment>
  )
}

export { ProductsList }
