import { LIMIT, SIZE } from '@/lib/consts'
import { getKey, getPokemon } from '@/lib/functions'
import { Pokemon } from '@/lib/types'
import { createContext, ReactNode, RefObject, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import useSWRInfinite from 'swr/infinite'
import { ScrollContextSetProgess } from './ScrollContext'

export const DataContextData = createContext<Pokemon[]>([])
export const DataContextIsLoading = createContext(true)
export const DataContextLoader = createContext({ isValidating: true, isThereMore: true })
export const DataContextUpdateProgress = createContext<(() => void) | null>(null)
export const DataContextRef = createContext<RefObject<HTMLElement> | null>(null)
export const DataContextProgress = createContext(0)

const swrConfig = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateAll: false
}

export function DataContextProvider({ children }: { children: ReactNode }) {
  const scrollElementRef = useRef<HTMLElement>(null)
  const { data, isLoading, isValidating, setSize } = useSWRInfinite(getKey, getPokemon, swrConfig)
  const setProgress = useContext(ScrollContextSetProgess)!

  const array: Pokemon[] = useMemo(() => {
    const array: Pokemon[] = []
    if (!data) return array
    return array.concat(...data)
  }, [data])

  const isThereMore = useMemo(() => (data ? ([] as Pokemon[]).concat(...data).length <= LIMIT - SIZE : true), [data])

  const updateProgress = useCallback(() => {
    if (!scrollElementRef.current || !data || data?.length == 0) return
    const { scrollTop, offsetHeight } = scrollElementRef.current
    const size = ([] as Pokemon[]).concat(...data).length / SIZE

    const current = scrollTop + offsetHeight
    const target = SIZE * (size / 4) * (21 * 16 + 32) + 120 + 64

    const isThereMore = SIZE * (size + 1) < LIMIT

    if (current >= target && isThereMore) {
      setSize(prev => prev + 1)
    }

    if (isThereMore) {
      setProgress((current - offsetHeight) / (target - offsetHeight))
    } else {
      setProgress((current - offsetHeight) / (target - 120 - offsetHeight))
    }
  }, [data, setSize, setProgress])

  useEffect(() => {
    updateProgress()
  }, [updateProgress])

  return (
    <DataContextData.Provider value={array}>
      <DataContextIsLoading.Provider value={isLoading}>
        <DataContextLoader.Provider value={{ isValidating, isThereMore }}>
          <DataContextUpdateProgress.Provider value={updateProgress}>
            <DataContextRef.Provider value={scrollElementRef}>{children}</DataContextRef.Provider>
          </DataContextUpdateProgress.Provider>
        </DataContextLoader.Provider>
      </DataContextIsLoading.Provider>
    </DataContextData.Provider>
  )
}
