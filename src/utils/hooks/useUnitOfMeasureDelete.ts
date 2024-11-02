import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { queryClient } from '@/main'
import { api } from '@/api'
import { UNIT_OF_MEASURE } from '@/api/types'
import { useToast } from '@chakra-ui/react'

export const useUnitOfMeasureDelete = (): UseMutationResult<void, Error, UNIT_OF_MEASURE> => {
  const toast = useToast()

  const mutationFn = (unit: UNIT_OF_MEASURE) => {
    return api.unitOfMeasureDelete(unit)
  }

  return useMutation<void, Error, UNIT_OF_MEASURE>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast({
        title: 'Какой-то продукт удален',
        description: 'Мы не знаем какой! Поздравляем! 🎉',
        status: 'success',
        duration: 2500,
        isClosable: true,
      })
    },
  })
}
