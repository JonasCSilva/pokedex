import deepEqual from 'fast-deep-equal'
import { memo, useContext, useEffect, useRef } from 'react'

import { Card } from '@/components/card/Card'
import { Loader } from '@/components/loader/Loader'
import { DataContextData, DataContextSetSize } from '@/contexts/DataContext'
import { ScrollContextSetProgess } from '@/contexts/ScrollContext'
import { LIMIT, SIZE } from '@/lib/consts'

import styles from './styles.module.scss'

const MemoizedCard = memo(Card, deepEqual)
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
  const target = SIZE * (size / 4) * (21 * 16 + 32) + 120 + 64
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
        <MemoizedCard key={pokemon.id} pokemon={pokemon} />
      ))}
      <MemoizedLoader />
    </main>
  )
}
