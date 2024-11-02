import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { pageRoutes } from './router/pageRoutes'

import { routes } from './router/routes'

const App: FC = () => {
  return (
    <Box
      display={'grid'}
      gridAutoFlow={'column'}
      gridAutoColumns={'auto'}
      minHeight={'100vh'}
      width={'calc(100vw - 20px)'}
      position={'relative'}
    >
      <Routes>
        {pageRoutes.map((route) => (
          <Route
            {...route}
            key={route.path}
          />
        ))}
        <Route
          path={'*'}
          element={<Navigate to={routes.list} />}
        />
      </Routes>
    </Box>
  )
}

export { App }
