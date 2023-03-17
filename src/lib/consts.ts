import { StatsColors, StatsLimits, TypesColors } from './types'

export const SIZE = 24

export const LIMIT = /* 200 */ 1010

export const statsLimits: StatsLimits = {
  hp: 255,
  attack: 181,
  defense: 230,
  'special-attack': 173,
  'special-defense': 230,
  speed: 200
}

export const statsColors: StatsColors = {
  hp: '#ff0000',
  attack: '#f08030',
  defense: '#f8d030',
  'special-attack': '#6890f0',
  'special-defense': '#78c850',
  speed: '#f85888'
}

export const typesColors: TypesColors = {
  bug: '#004a1f',
  dark: '#010202',
  dragon: '#008b97',
  electric: '#b9bb00',
  fairy: '#b01344',
  fighting: '#b03d1e',
  fire: '#c8191e',
  flying: '#37677f',
  ghost: '#30306d',
  grass: '#007c36',
  ground: '#b97021',
  ice: '#4fd2f6',
  normal: '#81515c',
  poison: '#6b298d',
  psychic: '#bf246d',
  rock: '#521204',
  steel: '#55756e',
  water: '#0051e6'
}

/* 
query samplePokeAPIquery {
  pokemon_v2_pokemonstat_aggregate(order_by: {base_stat: desc}, where: {pokemon_v2_stat: {name: {_eq: "speed"}}, pokemon_v2_pokemon: {id: {_lte: 1010}}}) {
    nodes {
    base_stat
    pokemon_id
    effort
    }
  }
}   
*/
