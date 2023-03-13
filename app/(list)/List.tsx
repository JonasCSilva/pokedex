'use client'

import { Card } from '../(card)/Card'
import { Pokemon } from '../types'
import styles from './styles.module.scss'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import { memo, UIEventHandler, useMemo, useRef } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const SIZE = 24

const MemoizedCard = memo(Card)

async function getData(key: string): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${SIZE}&${key}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const { results } = await res.json()

  const promises = []

  for (const result of results) {
    promises.push(fetch(result.url).then(res => res.json()))
  }

  return Promise.all(promises)
}

const getKey: SWRInfiniteKeyLoader = (index: number) => `offset=${SIZE * index}`

export function List() {
  const { data, isLoading, isValidating, size, setSize } = useSWRInfinite(getKey, getData)
  const scrollElement = useRef<HTMLElement>(null)

  const array: Pokemon[] = useMemo(() => {
    const array: Pokemon[] = []
    if (!data) return array
    return array.concat(...data)
  }, [data])

  const handleScroll: UIEventHandler<HTMLElement> = event => {
    const { scrollTop, offsetHeight } = event.currentTarget

    const current = scrollTop + offsetHeight
    const target = SIZE * (size / 4) * (352 + 32) + 120 + 32

    if (current >= target) {
      setSize(prev => prev + 1)
    }
  }

  return (
    <>
      {isLoading ? (
        <div className={styles.mainLoaderContainer}>
          <ClipLoader loading color='red' size={200} />
        </div>
      ) : (
        <main className={styles.main} onScroll={handleScroll} ref={scrollElement}>
          {array.map(pokemon => (
            <MemoizedCard key={pokemon.id} pokemon={pokemon} />
          ))}
          <div className={styles.loaderContainer}>
            <ClipLoader loading={isValidating} color='red' size={100} />
          </div>
        </main>
      )}
    </>
  )
}
