import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { api, TGetMinPriceProductResponse } from '@/api'

export const useMinPriceProduct = (): UseQueryResult<TGetMinPriceProductResponse, Error> => {
  return useQuery({
    queryKey: ['products', 'min-price'],
    queryFn: () => api.minPriceProduct(),
  })
}
