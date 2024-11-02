import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { queryClient } from '@/main'
import { api } from '@/api'
import { useToast } from '@chakra-ui/react'

export const useProductDelete = (): UseMutationResult<void, Error, number> => {
  const toast = useToast()

  const mutationFn = (id: number) => {
    return api.productDelete(id)
  }

  return useMutation<void, Error, number>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast({
        title: 'Продукт удален',
        description: 'Поздравляем с удалением продукта! 🎉',
        status: 'success',
        duration: 2500,
        isClosable: true,
      })
    },
  })
}
