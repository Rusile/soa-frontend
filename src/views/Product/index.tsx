import { Loader } from '@/components/Loader'
import { routes } from '@/router/routes'
import { useProduct } from '@/utils/hooks/useProduct'
import {
  Box,
  Button,
  Card,
  Flex,
  Icon,
  Stat,
  StatHelpText,
  StatNumber,
  Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC, Fragment } from 'react'
import { MdLaunch } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

const Product: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading } = useProduct(Number(id))

  if (isLoading || !product) {
    return <Loader />
  }

  return (
    <Fragment>
      <Card
        height={'calc(100% - 50px)'}
        padding={4}
        borderRadius={'lg'}
      >
        <Text
          mb={10}
          width={'100%'}
          textAlign={'center'}
          fontSize={28}
          fontWeight={600}
        >
          {product.name} ({product.partNumber})
        </Text>
        <Flex justifyContent={'space-around'}>
          <Stat
            width={'fit-content'}
            maxW={'300px'}
          >
            <StatNumber width={'fit-content'}>
              ${product.price} / {product.unitOfMeasure.toLowerCase().slice(0, -1)}
            </StatNumber>
            {product.creationDate && (
              <StatHelpText width={'fit-content'}>
                {dayjs(product.creationDate).format('DD.MM.YYYY')}
              </StatHelpText>
            )}
          </Stat>
          {product.owner && (
            <Box>
              <Text
                fontSize={24}
                fontWeight={500}
              >
                Владелец
              </Text>
              <Text>
                <Text
                  as={'span'}
                  fontWeight={600}
                >
                  Имя:
                </Text>{' '}
                {product.owner.name}
              </Text>
              <Text>
                <Text
                  as={'span'}
                  fontWeight={600}
                >
                  День рождения:
                </Text>{' '}
                {dayjs(product.owner.birthday).format('DD.MM.YYYY')}
              </Text>
              <Text>
                <Text
                  as={'span'}
                  fontWeight={600}
                >
                  Масса:
                </Text>{' '}
                {product.owner.weight} кг{' '}
              </Text>
              <Text>
                <Text
                  as={'span'}
                  fontWeight={600}
                >
                  Цвет волос:
                </Text>{' '}
                {product.owner.hairColor}
              </Text>
              <Text>
                <Text
                  as={'span'}
                  fontWeight={600}
                >
                  Цвет глаз:
                </Text>{' '}
                {product.owner.eyeColor}
              </Text>
              <Text>
                <Text
                  as={'span'}
                  fontWeight={600}
                >
                  Координаты:
                </Text>{' '}
                {product.coordinates.x}/{product.coordinates.y}
              </Text>
            </Box>
          )}
        </Flex>
      </Card>
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

export { Product }
