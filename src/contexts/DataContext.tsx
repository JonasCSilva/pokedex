import { ReactNode, RefObject, createContext, useMemo } from 'react'
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'

import { getKey, getPokemon } from '@/lib/functions'
import { Pokemon } from '@/lib/types'

type SetSize = (size: number | ((_size: number) => number)) => Promise<Pokemon[][] | undefined>

export const DataContextData = createContext<Pokemon[]>([])
export const DataContextIsLoading = createContext(true)
export const DataContextIsValidating = createContext(false)
export const DataContextRef = createContext<RefObject<HTMLElement> | null>(null)
export const DataContextProgress = createContext(0)
export const DataContextSetSize = createContext<SetSize | null>(null)

const swrConfig: SWRInfiniteConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateAll: false
}

export function DataContextProvider({ children }: { children: ReactNode }) {
  const { data: rawData, isLoading, isValidating, setSize } = useSWRInfinite(getKey, getPokemon, swrConfig)

  const data: Pokemon[] = useMemo(() => {
    const array: Pokemon[] = []
    if (!rawData) return array

    const pokemon = array.concat(...rawData)

    const largest = pokemon.map(pokemon => Math.max(...pokemon.stats.map(_ => _.base_stat)))

    console.log(Math.max(...largest))

    return array.concat(...rawData)
  }, [rawData])

  return (
    <DataContextData.Provider value={data}>
      <DataContextIsLoading.Provider value={isLoading}>
        <DataContextIsValidating.Provider value={isValidating}>
          <DataContextSetSize.Provider value={setSize}>{children}</DataContextSetSize.Provider>
        </DataContextIsValidating.Provider>
      </DataContextIsLoading.Provider>
    </DataContextData.Provider>
  )
}
