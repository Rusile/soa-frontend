import { TGetProductsFilter } from '@/api'
import { SORT_FIELD } from '@/api/types'
import { useProductsListContext } from '@/utils/contexts/ProductsListContext'
import { Button, Flex, Input, Select, Tag, TagCloseButton } from '@chakra-ui/react'
import { produce } from 'immer'
import { FC, useState } from 'react'

const FilterManager: FC = () => {
  const [selectedField, setSelectedField] = useState<SORT_FIELD | ''>('')
  const [filterValue, setFilterValue] = useState<string>('')
  const { filters, setFilters } = useProductsListContext()

  const handleAddFilter = () => {
    if (selectedField && filterValue) {
      const newFilter: TGetProductsFilter = {
        fieldType: selectedField,
        value: filterValue,
      }
      setFilters(
        produce((draft) => {
          draft.push(newFilter)
        }),
      )
      setSelectedField('')
      setFilterValue('')
    }
  }

  const removeFilter = (filterToRemove: TGetProductsFilter) => {
    setFilters(
      produce((draft) => {
        return draft.filter(
          (filter) =>
            !(
              filter.fieldType === filterToRemove.fieldType && filter.value === filterToRemove.value
            ),
        )
      }),
    )
  }

  return (
    <Flex
      flexDirection='column'
      gap={4}
    >
      <Flex gap={2}>
        <Select
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value as SORT_FIELD)}
          placeholder='Выберите поле'
          w={'300px'}
        >
          {Object.values(SORT_FIELD).map((field) => (
            <option
              key={field}
              value={field}
            >
              {field.replace(/_/g, ' ')}
            </option>
          ))}
        </Select>

        <Input
          w={'500px'}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder='Значение фильтра'
        />

        <Button
          w={'200px'}
          onClick={handleAddFilter}
        >
          Добавить фильтр
        </Button>
      </Flex>

      <Flex
        wrap='wrap'
        gap={2}
      >
        {filters.map((filter, index) => (
          <Tag
            key={`${filter.fieldType}-${filter.value}-${index}`}
            size='lg'
            borderRadius='full'
            variant='solid'
          >
            {filter.fieldType}: {filter.value}
            <TagCloseButton onClick={() => removeFilter(filter)} />
          </Tag>
        ))}
      </Flex>
    </Flex>
  )
}

export { FilterManager }
