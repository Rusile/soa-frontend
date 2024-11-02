import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { queryClient } from '@/main'
import { api, TCreateProductRequest, TCreateProductResponse } from '@/api'
import { useToast } from '@chakra-ui/react'

export const useProductCreate = (): UseMutationResult<
  TCreateProductResponse,
  Error,
  TCreateProductRequest
> => {
  const toast = useToast()

  const mutationFn = (data: TCreateProductRequest) => {
    return api.productCreate(data)
  }

  return useMutation<TCreateProductResponse, Error, TCreateProductRequest>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast({
        title: 'Продукт создан',
        description: 'Поздравляем с созданием продукта! 🎉',
        status: 'success',
        duration: 2500,
        isClosable: true,
      })
    },
  })
}
