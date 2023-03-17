import deepEqual from 'fast-deep-equal'
import { memo, useContext, useEffect, useRef } from 'react'

import { GridCard } from '@/components/grid-card/GridCard'
import { Loader } from '@/components/loader/Loader'
import { DataContextData, DataContextSetSize } from '@/contexts/DataContext'
import { ScrollContextSetProgess } from '@/contexts/ScrollContext'
import { SelectedPokemonContextPokemon } from '@/contexts/SelectedPokemonContext'
import { LIMIT, SIZE } from '@/lib/consts'

import styles from './styles.module.scss'

const MemoizedGridCard = memo(GridCard, deepEqual)
const MemoizedLoader = memo(Loader)

const getVariables = (
  element: HTMLElement,
  length: number
): {
  progress: number
  shouldSetSize: boolean
} => {
  const { scrollTop, offsetHeight } = element

  const size = length / SIZE
  const target = SIZE * (size / 4) * (21 * 16 + 16 * 3) + 120 + 64
  const isThereMore = SIZE * (size + 1) < LIMIT
  const total = target - offsetHeight
  const shouldSetSize = scrollTop + offsetHeight >= target && isThereMore
  const progress = isThereMore ? scrollTop / total : scrollTop / (total - 120)

  return { progress, shouldSetSize }
}

export function Grid() {
  const setSize = useContext(DataContextSetSize)!
  const setProgress = useContext(ScrollContextSetProgess)!
  const data = useContext(DataContextData)
  const scrollElementRef = useRef<HTMLElement>(null)
  const selectedPokemon = useContext(SelectedPokemonContextPokemon)!

  const onScroll = () => {
    const { progress, shouldSetSize } = getVariables(scrollElementRef.current!, data.length)
    setProgress(progress)

    if (shouldSetSize) {
      setSize(prev => prev + 1)
    }
  }

  useEffect(() => {
    if (!scrollElementRef.current || data.length < 1) return
    const { progress } = getVariables(scrollElementRef.current, data.length)
    setProgress(progress)
  }, [data, setProgress])

  return (
    <main className={styles.main} onScroll={onScroll} ref={scrollElementRef}>
      {data.map(pokemon => (
        <MemoizedGridCard key={pokemon.id} pokemon={pokemon} isSelected={selectedPokemon?.id === pokemon.id} />
      ))}
      <MemoizedLoader />
    </main>
  )
}
