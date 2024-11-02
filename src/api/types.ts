export enum EYE_COLOR {
  RED = 'RED',
  BLACK = 'BLACK',
  YELLOW = 'YELLOW',
  ORANGE = 'ORANGE',
  WHITE = 'WHITE',
}

export enum HAIR_COLOR {
  RED = 'RED',
  BLACK = 'BLACK',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
}

export enum UNIT_OF_MEASURE {
  KILOGRAMS = 'KILOGRAMS',
  METERS = 'METERS',
  LITERS = 'LITERS',
}

export enum SORT_FIELD {
  ID = 'ID',
  NAME = 'NAME',
  COORDINATES_X = 'COORDINATES_X',
  COORDINATES_Y = 'COORDINATES_Y',
  CREATION_DATE = 'CREATION_DATE',
  PRICE = 'PRICE',
  PART_NUMBER = 'PART_NUMBER',
  UNIT_OF_MEASURE = 'UNIT_OF_MEASURE',
  OWNER_NAME = 'OWNER_NAME',
  OWNER_BIRTHDAY = 'OWNER_BIRTHDAY',
  OWNER_WEIGHT = 'OWNER_WEIGHT',
  OWNER_EYE_COLOR = 'OWNER_EYE_COLOR',
  OWNER_HAIR_COLOR = 'OWNER_HAIR_COLOR',
}

export type TCoordinates = {
  x: number
  y: number
}

export type TPerson = {
  name: string
  birthday?: string
  weight: number
  eyeColor?: EYE_COLOR
  hairColor: HAIR_COLOR
}

export type TProduct = {
  id: number
  name: string
  coordinates: TCoordinates
  creationDate: string
  price: number
  partNumber: string
  unitOfMeasure: UNIT_OF_MEASURE
  owner?: TPerson
}
