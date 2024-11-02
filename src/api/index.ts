import { client } from './client'
import { SORT_FIELD, TProduct, UNIT_OF_MEASURE } from './types'

export type TGetProductsParams = {
  page?: number
  size?: number
  sortBy?: SORT_FIELD[]
}

export type TGetProductsFilter = {
  value: string
  fieldType: SORT_FIELD
}

export type TPageableResponse = {
  pageNumber: number
  pageSize: number
}

export type TGetProductsResponse = {
  content: TProduct[]
  pageable: TPageableResponse
  totalPages: number
  totalElements: number
}

const products = async (params: TGetProductsParams, filters: TGetProductsFilter[]) => {
  const res = await client.get<TGetProductsResponse>('/products', {
    params: {
      page: params.page,
      size: params.size,
      sortBy: params.sortBy,
      filters: JSON.stringify(filters),
    },
    paramsSerializer: {
      indexes: null,
    },
  })
  return res.data
}

export type TCreateProductRequest = Omit<TProduct, 'id' | 'creationDate'>
export type TCreateProductResponse = TProduct

const productCreate = async (data: TCreateProductRequest) => {
  const res = await client.post<TCreateProductResponse>('/products', data)
  return res.data
}

export type TGetProductResponse = TProduct

const product = async (id: number) => {
  const res = await client.get<TGetProductResponse>(`/products/${id}`)
  return res.data
}

export type TUpdateProductRequest = Omit<TProduct, 'id' | 'creationDate'>
export type TUpdateProductResponse = TProduct

const productUpdate = async (id: number, data: TUpdateProductRequest) => {
  const res = await client.put<TUpdateProductResponse>(`/products/${id}`, data)
  return res.data
}

const productDelete = async (id: number) => {
  const res = await client.delete(`/products/${id}`)
  return res.data
}

const unitOfMeasureDelete = async (unitOfMeasure: UNIT_OF_MEASURE) => {
  const res = await client.delete(`/products/unit-of-measure/${unitOfMeasure}`)
  return res.data
}

export type TGetMinPriceProductResponse = TProduct

const minPriceProduct = async () => {
  const res = await client.get<TGetMinPriceProductResponse>('/products/min-price')
  return res.data
}

export type TSearchProductsParams = {
  substring: string
}

export type TSearchProductResponse = TProduct[]

const searchProduct = async (params: TSearchProductsParams) => {
  const res = await client.get<TSearchProductResponse>('/products/search', {
    params: {
      substring: params.substring,
    },
  })
  return res.data
}

export const api = {
  products,
  productCreate,
  product,
  productUpdate,
  productDelete,
  unitOfMeasureDelete,
  minPriceProduct,
  searchProduct,
}
