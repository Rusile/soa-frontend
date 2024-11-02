import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { api, TGetProductsResponse, TGetProductsParams, TGetProductsFilter } from '@/api'

type TUseProductsParams = {
  params?: TGetProductsParams
  filters?: TGetProductsFilter[] | undefined
}

export const useProducts = ({ params = {}, filters = [] }: TUseProductsParams = {}): UseQueryResult<
  TGetProductsResponse,
  Error
> => {
  const queryFn = () => {
    return api.products(params, filters)
  }

  return useQuery({
    queryKey: ['products', params, filters],
    queryFn,
  })
}
