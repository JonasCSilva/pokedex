import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

import { Pokemon } from '@/lib/types'

export const SelectedPokemonContextPokemon = createContext<Pokemon | null>(null)
export const SelectedPokemonContextSetPokemon = createContext<Dispatch<SetStateAction<Pokemon | null>> | null>(null)

export function SelectedPokemonContextProvider({ children }: { children: ReactNode }) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

  return (
    <SelectedPokemonContextPokemon.Provider value={selectedPokemon}>
      <SelectedPokemonContextSetPokemon.Provider value={setSelectedPokemon}>
        {children}
      </SelectedPokemonContextSetPokemon.Provider>
    </SelectedPokemonContextPokemon.Provider>
  )
}
