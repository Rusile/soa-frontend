import { TCreateProductRequest } from '@/api'
import { EYE_COLOR, HAIR_COLOR, TProduct, UNIT_OF_MEASURE } from '@/api/types'
import { useProductCreate } from '@/utils/hooks/useProductCreate'
import { useProductUpdate } from '@/utils/hooks/useProductUpdate'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  useDisclosure,
} from '@chakra-ui/react'
import { produce } from 'immer'
import { FC, useCallback, useState } from 'react'
import { MdAdd, MdEdit } from 'react-icons/md'
import { getInitialFormData } from './getInitialFormData'

export type TFormModalProps =
  | {
      type: 'create'
    }
  | {
      type: 'edit'
      product: TProduct
    }

const FormModal: FC<TFormModalProps> = (props) => {
  const { type } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mutate: createProduct } = useProductCreate()
  const { mutate: updateProduct } = useProductUpdate()

  const [formData, setFormData] = useState<TCreateProductRequest>(getInitialFormData(props))

  const updateFormData = (callback: (draft: TCreateProductRequest) => void) => {
    setFormData(produce(callback))
  }

  const handleSubmitCreation = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      createProduct(formData)
      onClose()
    },
    [formData, createProduct, onClose],
  )

  const handleSubmitUpdating = useCallback(
    (e: React.FormEvent) => {
      if (type === 'edit') {
        e.preventDefault()
        updateProduct({ id: props.product.id, data: formData })
        onClose()
      }
    },
    [type, formData, updateProduct, onClose, props],
  )

  return (
    <>
      {type === 'edit' ? (
        <IconButton
          aria-label='Edit product'
          icon={<Icon as={MdEdit} />}
          colorScheme='yellow'
          onClick={onOpen}
          w={'fit-content'}
        />
      ) : (
        <Button
          aria-label='Create product'
          rightIcon={<Icon as={MdAdd} />}
          colorScheme='blue'
          onClick={onOpen}
          w={'fit-content'}
        >
          Добавить продукт
        </Button>
      )}

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {type === 'edit' ? 'Редактировать продукт' : 'Добавить продукт'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
              as='form'
              onSubmit={type === 'create' ? handleSubmitCreation : handleSubmitUpdating}
            >
              <FormControl
                isRequired
                mb={4}
              >
                <FormLabel>Name</FormLabel>
                <Input
                  name='name'
                  value={formData.name}
                  onChange={(e) =>
                    updateFormData((draft) => {
                      draft.name = e.target.value
                    })
                  }
                />
              </FormControl>

              <FormControl
                isRequired
                mb={4}
              >
                <FormLabel>Coordinates X</FormLabel>
                <NumberInput
                  value={formData.coordinates.x}
                  onChange={(value) =>
                    updateFormData((draft) => {
                      draft.coordinates.x = Number(value)
                    })
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl
                isRequired
                mb={4}
              >
                <FormLabel>Coordinates Y</FormLabel>
                <NumberInput
                  value={formData.coordinates.y}
                  onChange={(value) =>
                    updateFormData((draft) => {
                      draft.coordinates.y = Number(value)
                    })
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl
                isRequired
                mb={4}
              >
                <FormLabel>Price</FormLabel>
                <NumberInput
                  value={formData.price}
                  onChange={(value) =>
                    updateFormData((draft) => {
                      draft.price = Number(value)
                    })
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl
                isRequired
                mb={4}
              >
                <FormLabel>Part Number</FormLabel>
                <Input
                  name='partNumber'
                  value={formData.partNumber}
                  onChange={(e) =>
                    updateFormData((draft) => {
                      draft.partNumber = e.target.value
                    })
                  }
                />
              </FormControl>

              <FormControl
                isRequired
                mb={4}
              >
                <FormLabel>Unit of Measure</FormLabel>
                <Select
                  value={formData.unitOfMeasure}
                  onChange={(e) =>
                    updateFormData((draft) => {
                      draft.unitOfMeasure = e.target.value as UNIT_OF_MEASURE
                    })
                  }
                >
                  {Object.values(UNIT_OF_MEASURE).map((unit) => (
                    <option
                      key={unit}
                      value={unit}
                    >
                      {unit}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                mb={4}
              >
                <FormLabel>Owner Name</FormLabel>
                <Input
                  value={formData.owner?.name}
                  onChange={(e) =>
                    updateFormData((draft) => {
                      if (draft.owner) draft.owner.name = e.target.value
                    })
                  }
                />
              </FormControl>

              <FormControl
                mb={4}
              >
                <FormLabel>Owner Weight</FormLabel>
                <NumberInput
                  value={formData.owner?.weight}
                  onChange={(value) =>
                    updateFormData((draft) => {
                      if (draft.owner) draft.owner.weight = Number(value)
                    })
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl
                mb={4}
              >
                <FormLabel>Eye Color</FormLabel>
                <Select
                  value={formData.owner?.eyeColor}
                  onChange={(e) =>
                    updateFormData((draft) => {
                      if (draft.owner) draft.owner.eyeColor = e.target.value as EYE_COLOR
                    })
                  }
                >
                  {Object.values(EYE_COLOR).map((color) => (
                    <option
                      key={color}
                      value={color}
                    >
                      {color}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                mb={4}
              >
                <FormLabel>Hair Color</FormLabel>
                <Select
                  value={formData.owner?.hairColor}
                  onChange={(e) =>
                    updateFormData((draft) => {
                      if (draft.owner) draft.owner.hairColor = e.target.value as HAIR_COLOR
                    })
                  }
                >
                  {Object.values(HAIR_COLOR).map((color) => (
                    <option
                      key={color}
                      value={color}
                    >
                      {color}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Button
                type='submit'
                colorScheme='blue'
                width={'full'}
              >
                {type === 'edit' ? 'Изменить 🕊️' : 'Добавить ✍️'}
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export { FormModal }
