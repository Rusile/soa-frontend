import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { queryClient } from '@/main'
import { api, TUpdateProductRequest, TUpdateProductResponse } from '@/api'
import { useToast } from '@chakra-ui/react'

type TUpdateProductMutation = {
  id: number
  data: TUpdateProductRequest
}

export const useProductUpdate = (): UseMutationResult<
  TUpdateProductResponse,
  Error,
  TUpdateProductMutation
> => {
  const toast = useToast()

  const mutationFn = ({ id, data }: TUpdateProductMutation) => {
    return api.productUpdate(id, data)
  }

  return useMutation<TUpdateProductResponse, Error, TUpdateProductMutation>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast({
        title: 'Продукт обновлен',
        description: 'Поздравляем с обновлением продукта! 🎉',
        status: 'success',
        duration: 2500,
        isClosable: true,
      })
    },
  })
}
