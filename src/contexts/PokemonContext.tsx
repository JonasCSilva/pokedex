import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

import { Pokemon } from '@/lib/types'

export const PokemonContextPokemon = createContext<Pokemon | null>(null)
export const PokemonContextSetPokemon = createContext<Dispatch<SetStateAction<Pokemon | null>> | null>(null)

export function PokemonContextProvider({ children }: { children: ReactNode }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  return (
    <PokemonContextPokemon.Provider value={pokemon}>
      <PokemonContextSetPokemon.Provider value={setPokemon}>{children}</PokemonContextSetPokemon.Provider>
    </PokemonContextPokemon.Provider>
  )
}
