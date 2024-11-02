import { SORT_FIELD, TProduct } from '@/api/types'
import React, { Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { TGetProductsFilter } from '@/api'

export type TProductsListContextShape = {
  productsList: TProduct[]
  totalElements: number
  totalPages: number
  isLoading: boolean
  page: number
  setPage: Dispatch<SetStateAction<number>>
  size: number
  setSize: Dispatch<SetStateAction<number>>
  sortBy: SORT_FIELD[]
  setSortBy: Dispatch<SetStateAction<SORT_FIELD[]>>
  filters: TGetProductsFilter[]
  setFilters: Dispatch<SetStateAction<TGetProductsFilter[]>>
}

const ProductsListContext = React.createContext<TProductsListContextShape>(
  {} as TProductsListContextShape,
)

export type TProductsListProviderProps = {
  children: React.ReactNode
}

const ProductsListProvider = (props: TProductsListProviderProps) => {
  const { children } = props

  const [page, setPage] = useState<number>(0)
  const [size, setSize] = useState<number>(10)
  const [sortBy, setSortBy] = useState<SORT_FIELD[]>([])
  const [filters, setFilters] = useState<TGetProductsFilter[]>([])

  const { data, isLoading } = useProducts({ filters, params: { page, size, sortBy } })

  const value: TProductsListContextShape = useMemo(
    () => ({
      productsList: data?.content ?? [],
      totalElements: data?.totalElements ?? 0,
      totalPages: data?.totalPages ?? 0,
      isLoading,
      page,
      setPage,
      size,
      setSize,
      sortBy,
      setSortBy,
      filters,
      setFilters,
    }),
    [data, isLoading, page, setPage, size, setSize, sortBy, setSortBy, filters, setFilters],
  )

  return <ProductsListContext.Provider value={value}>{children}</ProductsListContext.Provider>
}

const useProductsListContext = () => {
  const context = useContext(ProductsListContext)

  if (!context || !Object.keys(context).length) {
    throw new Error('useProductsListContext was used outside of its Provider')
  }

  return context
}

export { ProductsListContext, useProductsListContext, ProductsListProvider }
