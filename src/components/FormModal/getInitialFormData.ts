import { EYE_COLOR, HAIR_COLOR, UNIT_OF_MEASURE } from '@/api/types'
import { TFormModalProps } from '.'
import { TCreateProductRequest } from '@/api'

const getInitialFormData = (props: TFormModalProps): TCreateProductRequest => {
  if (props.type === 'edit') {
    const { product } = props
    return {
      name: product.name,
      coordinates: product.coordinates,
      price: product.price,
      partNumber: product.partNumber,
      unitOfMeasure: product.unitOfMeasure,
      owner: product.owner
        ? {
            name: product.owner.name,
            weight: product.owner.weight,
            hairColor: product.owner.hairColor,
            eyeColor: product.owner.eyeColor,
          }
        : undefined,
    }
  }

  return {
    name: '',
    coordinates: {
      x: 0,
      y: 0,
    },
    price: 0,
    partNumber: '',
    unitOfMeasure: UNIT_OF_MEASURE.KILOGRAMS,
    owner: {
      name: '',
      weight: 0,
      hairColor: HAIR_COLOR.BLACK,
      eyeColor: EYE_COLOR.BLACK,
    },
  }
}

export { getInitialFormData }
