import { typesColors } from './lib'

export type TypesNames = keyof typeof typesColors

export type Pokemon = {
  name: string
  id: number
  weight: number
  types: {
    type: {
      name: TypesNames
    }
  }[]
}
