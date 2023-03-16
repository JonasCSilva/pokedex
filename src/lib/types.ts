import { typesColors } from '@/lib/typesColors'

export type TypesNames = keyof typeof typesColors

export type Pokemon = {
  name: string
  id: number
  weight: number
  height: number
  base_experience: number
  types: {
    type: {
      name: TypesNames
    }
  }[]
  abilities: {
    ability: {
      name: string
    }
  }[]
  stats: {
    base_stat: number
  }[]
}
