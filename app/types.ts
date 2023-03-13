import { typesColors } from './lib'

export type TypesNames = keyof typeof typesColors

export type Pokemon = {
  name: string
  url: string
  sprites: { front_default: string }
  types: { type: { name: TypesNames } }[]
  id: number
}
