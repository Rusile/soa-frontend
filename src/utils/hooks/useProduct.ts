import { api, TGetProductResponse } from '@/api'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

export const useProduct = (id: number | undefined): UseQueryResult<TGetProductResponse, Error> => {
  const queryFn = () => {
    if (id === undefined) {
      throw new Error('Product ID is required')
    }

    return api.product(id)
  }

  return useQuery({
    queryKey: ['product', id],
    queryFn,
    enabled: id !== undefined,
  })
}
