import { SWRInfiniteKeyLoader } from 'swr/infinite'

import { SIZE } from '@/lib/consts'
import { Pokemon } from '@/lib/types'

export const firstLetterUpperCase = (string: string) => string.at(0)!.toUpperCase() + string.slice(1)

async function fetchGraphQL(query: string) {
  const result = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
    method: 'POST',
    body: JSON.stringify({
      query: query
    })
  })

  return result.json()
}

export async function getPokemon(key: string): Promise<Pokemon[]> {
  const response = await fetchGraphQL(
    `{
      pokemon: pokemon_v2_pokemon(limit: ${SIZE}, offset: ${key}) {
        name
        id
        weight
        height
        base_experience
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
        abilities: pokemon_v2_pokemonabilities {
          ability: pokemon_v2_ability {
            name
          }
        }
        stats: pokemon_v2_pokemonstats {
          base_stat
        }
      }
    }`
  )

  return response.data.pokemon
}

export const getKey: SWRInfiniteKeyLoader = (index: number) => `${SIZE * index}`
