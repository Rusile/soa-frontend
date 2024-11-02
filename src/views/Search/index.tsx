import { ProductCard } from '@/components/ProductCard'
import { routes } from '@/router/routes'
import { useSearchProducts } from '@/utils/hooks/useSearchProduct'
import { Button, Flex, Icon, Input, Text } from '@chakra-ui/react'
import { useDebounce } from '@uidotdev/usehooks'
import { FC, Fragment, useState } from 'react'
import { MdLaunch } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Search: FC = () => {
  const [search, setSearch] = useState<string>('')

  const debouncedSearch = useDebounce(search, 300)

  const { data } = useSearchProducts({ substring: debouncedSearch })

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
          Поиск продуктов 👩‍🎤🫴
        </Text>

        <Input
          placeholder='Поиск... (начните вводить)'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Flex
          flexWrap={'wrap'}
          gap={2}
        >
          {data?.map((item) => (
            <ProductCard
              key={item.id}
              productData={item}
            />
          ))}
        </Flex>
      </Flex>
      <Button
        position={'absolute'}
        top={4}
        right={4}
        rightIcon={<Icon as={MdLaunch} />}
        onClick={() => navigate(routes.list)}
      >
        Страница списка
      </Button>
    </Fragment>
  )
}

export { Search }
