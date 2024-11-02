import { ChangeEvent, FC, useState } from 'react'
import { FormModal } from '../FormModal'
import { Button, Flex, Select } from '@chakra-ui/react'
import { UNIT_OF_MEASURE } from '@/api/types'
import { useUnitOfMeasureDelete } from '@/utils/hooks/useUnitOfMeasureDelete'
import { SortManager } from './SortManager'
import { FilterManager } from './FilterManager'

const Controls: FC = () => {
  const [localUnit, setLocalUnit] = useState<UNIT_OF_MEASURE>(UNIT_OF_MEASURE.LITERS)

  const { mutate } = useUnitOfMeasureDelete()

  const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocalUnit(e.target.value as UNIT_OF_MEASURE)
  }

  return (
    <Flex
      flexDirection={'column'}
      gap={4}
    >
      <Flex
        gap={8}
        flex={1}
      >
        <FormModal type='create' />
        <Flex
          flex={1}
          gap={1}
        >
          <Button
            width={'fit-content'}
            onClick={() => mutate(localUnit)}
          >
            Удалить 1 продукт 👉
          </Button>
          <Select
            width={'fit-content'}
            value={localUnit}
            onChange={handleUnitChange}
          >
            <option value={UNIT_OF_MEASURE.LITERS}>LITERS</option>
            <option value={UNIT_OF_MEASURE.KILOGRAMS}>KILOGRAMS</option>
            <option value={UNIT_OF_MEASURE.METERS}>METERS</option>
          </Select>
        </Flex>
      </Flex>
      <SortManager />
      <FilterManager />
    </Flex>
  )
}

export { Controls }
