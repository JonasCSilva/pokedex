import { memo, useCallback, useContext } from 'react'
import { Card } from '@/components/card/Card'
import styles from './styles.module.scss'
import { DataContextData, DataContextRef, DataContextUpdateProgress } from '@/contexts/DataContext'
import { Loader } from '../loader/Loader'

const MemoizedCard = memo(Card)
const MemoizedLoader = memo(Loader)

export function Grid() {
  const data = useContext(DataContextData)
  const updateProgress = useContext(DataContextUpdateProgress)!
  const scrollElementRef = useContext(DataContextRef)!

  const handleScroll = useCallback(() => {
    updateProgress()
  }, [updateProgress])

  return (
    <main className={styles.main} onScroll={handleScroll} ref={scrollElementRef}>
      {data.map(pokemon => (
        <MemoizedCard key={pokemon.id} pokemon={pokemon} />
      ))}
      <MemoizedLoader />
    </main>
  )
}
