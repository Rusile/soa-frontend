import { TProduct } from '@/api/types'
import { useProductDelete } from '@/utils/hooks/useProductDelete'
import {
  Button,
  Card,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC } from 'react'
import { MdDelete, MdInfo, MdLaunch } from 'react-icons/md'
import { FormModal } from './FormModal'
import { useNavigate } from 'react-router-dom'

type TProductCardProps = {
  productData: TProduct
}

const ProductCard: FC<TProductCardProps> = ({ productData }) => {
  const { coordinates, id, name, partNumber, price, unitOfMeasure, creationDate, owner } =
    productData

  const navigate = useNavigate()

  const { mutate } = useProductDelete()

  return (
    <Card
      display={'flex'}
      minWidth={'400px'}
      padding={4}
    >
      <Stat>
        <StatLabel>
          {name} ({partNumber})
        </StatLabel>
        <StatNumber>
          ${price} / {unitOfMeasure.toLowerCase().slice(0, -1)}
        </StatNumber>
        {creationDate && <StatHelpText>{dayjs(creationDate).format('DD.MM.YYYY')}</StatHelpText>}
      </Stat>
      <Flex
        gap={2}
        justifyContent={'end'}
      >
        {owner && (
          <Popover>
            <PopoverTrigger>
              <IconButton
                aria-label='Info'
                icon={<Icon as={MdInfo} />}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Информация о продавце ☝️🥸</PopoverHeader>
              <PopoverBody>
                <Text>
                  <Text
                    as={'span'}
                    fontWeight={600}
                  >
                    Имя:
                  </Text>{' '}
                  {owner.name}
                </Text>
                <Text>
                  <Text
                    as={'span'}
                    fontWeight={600}
                  >
                    День рождения:
                  </Text>{' '}
                  {dayjs(owner.birthday).format('DD.MM.YYYY')}
                </Text>
                <Text>
                  <Text
                    as={'span'}
                    fontWeight={600}
                  >
                    Масса:
                  </Text>{' '}
                  {owner.weight} кг{' '}
                </Text>
                <Text>
                  <Text
                    as={'span'}
                    fontWeight={600}
                  >
                    Цвет волос:
                  </Text>{' '}
                  {owner.hairColor}
                </Text>
                <Text>
                  <Text
                    as={'span'}
                    fontWeight={600}
                  >
                    Цвет глаз:
                  </Text>{' '}
                  {owner.eyeColor}
                </Text>
                <Text>
                  <Text
                    as={'span'}
                    fontWeight={600}
                  >
                    Координаты:
                  </Text>{' '}
                  {coordinates.x}/{coordinates.y}
                </Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
        <IconButton
          aria-label='Open this product page'
          icon={<Icon as={MdLaunch} />}
          onClick={() => navigate(`/product/${id}`)}
          colorScheme='blue'
        />
        <FormModal
          type='edit'
          product={productData}
        />
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label='Delete product'
              icon={<Icon as={MdDelete} />}
              colorScheme='red'
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Text textAlign={'center'}>Вы уверены? 😦</Text>
            </PopoverHeader>
            <PopoverBody margin={'auto'}>
              <Button
                colorScheme='red'
                onClick={() => mutate(id)}
              >
                ДА, УДАЛИТЬ 🔪
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Card>
  )
}

export { ProductCard }
