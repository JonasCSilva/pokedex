import { statsLimits, typesColors } from '@/lib/consts'

export type TypesNames = keyof typeof typesColors

export type StatsNames = keyof typeof statsLimits

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
    stat: {
      name: StatsNames
    }
  }[]
}
