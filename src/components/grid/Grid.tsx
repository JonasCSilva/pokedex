import { memo, useCallback, useContext, useRef } from 'react'
import { Card } from '@/components/card/Card'
import styles from './styles.module.scss'
import { DataContextData, DataContextSetSize } from '@/contexts/DataContext'
import { Loader } from '../loader/Loader'
import { ScrollContextSetProgess } from '@/contexts/ScrollContext'
import { LIMIT, SIZE } from '@/lib/consts'

const MemoizedCard = memo(Card)
const MemoizedLoader = memo(Loader)

export function Grid() {
  const setSize = useContext(DataContextSetSize)!
  const setProgress = useContext(ScrollContextSetProgess)!
  const data = useContext(DataContextData)
  const scrollElementRef = useRef<HTMLElement>(null)

  const onScroll = useCallback(() => {
    const { scrollTop, offsetHeight } = scrollElementRef.current!

    const size = data.length / SIZE
    const currentScroll = scrollTop
    const target = SIZE * (size / 4) * (21 * 16 + 32) + 120 + 64
    const isThereMore = SIZE * (size + 1) < LIMIT
    const total = target - offsetHeight
    let progress = currentScroll / total

    if (!isThereMore) {
      progress = currentScroll / (total - 120)
    }

    setProgress(progress)

    if (currentScroll + offsetHeight >= target && isThereMore) {
      setSize(prev => prev + 1)
    }
  }, [data, setProgress, setSize])

  return (
    <main className={styles.main} onScroll={onScroll} ref={scrollElementRef}>
      {data.map(pokemon => (
        <MemoizedCard key={pokemon.id} pokemon={pokemon} />
      ))}
      <MemoizedLoader />
    </main>
  )
}
