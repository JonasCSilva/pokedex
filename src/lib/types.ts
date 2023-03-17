import { statsLimits, typesColors } from '@/lib/consts'

type TypesNames =
  | 'bug'
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'ghost'
  | 'grass'
  | 'ground'
  | 'ice'
  | 'normal'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'steel'
  | 'water'

type StatsNames = 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed'

export type StatsColors = { [key in StatsNames]: string }

export type StatsLimits = { [key in StatsNames]: number }

export type TypesColors = { [key in TypesNames]: string }

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
