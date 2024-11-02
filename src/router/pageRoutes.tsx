import { routes } from './routes'
import { RouteProps } from 'react-router-dom'
import { ProductsList } from '@/views/ProductsList'
import { Product } from '@/views/Product'
import { ProductsListProvider } from '@/utils/contexts/ProductsListContext'
import { Search } from '@/views/Search'

type TPageRoute = RouteProps
const pageRoutes: TPageRoute[] = [
  {
    path: routes.list,
    element: (
      <ProductsListProvider>
        <ProductsList />
      </ProductsListProvider>
    ),
  },
  {
    path: routes.product,
    element: <Product />,
  },
  {
    path: routes.search,
    element: <Search />,
  },
]

export { pageRoutes }
