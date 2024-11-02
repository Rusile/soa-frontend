import { CircularProgress } from '@chakra-ui/react'
import { FC } from 'react'

const Loader: FC = () => {
  return (
    <CircularProgress
      margin={'auto'}
      isIndeterminate
    />
  )
}

export { Loader }
