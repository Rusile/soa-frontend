import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { api, TSearchProductResponse, TSearchProductsParams } from '@/api'

export const useSearchProducts = ({
  substring,
}: TSearchProductsParams): UseQueryResult<TSearchProductResponse, Error> => {
  return useQuery({
    queryKey: ['products', 'search', substring],
    queryFn: () => api.searchProduct({ substring }),
    enabled: Boolean(substring.trim()),
  })
}
