import { Dispatch, memo, SetStateAction, UIEventHandler, useCallback, useMemo, useRef } from 'react'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import ClipLoader from 'react-spinners/ClipLoader'
import styles from './styles.module.scss'
import { Card } from '../card/Card'
import { Pokemon } from '../../lib/types'

const SIZE = 24

const MemoizedCard = memo(Card)

async function fetchGraphQL(query: string) {
  const result = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
    method: 'POST',
    body: JSON.stringify({
      query: query
    })
  })

  return result.json()
}

async function getPokemon(key: string): Promise<Pokemon[]> {
  const { data } = await fetchGraphQL(
    `{
      pokemon: pokemon_v2_pokemon(limit: ${SIZE}, offset: ${key}) {
        name
        id
        weight
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
    }`
  )

  return data.pokemon
}

const getKey: SWRInfiniteKeyLoader = (index: number) => `${SIZE * index}`

export function List({ setPokemon }: { setPokemon: Dispatch<SetStateAction<Pokemon | null>> }) {
  const { data, isLoading, isValidating, size, setSize } = useSWRInfinite(getKey, getPokemon, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateAll: false
  })
  const scrollElement = useRef<HTMLElement>(null)

  const array: Pokemon[] = useMemo(() => {
    const array: Pokemon[] = []
    if (!data) return array
    return array.concat(...data)
  }, [data])

  const handleScroll: UIEventHandler<HTMLElement> = useCallback(
    event => {
      const { scrollTop, offsetHeight } = event.currentTarget

      const current = scrollTop + offsetHeight
      const target = SIZE * (size / 4) * (352 + 32) + 120 + 64

      if (current >= target && SIZE * (size + 1) < 1010) {
        setSize(prev => prev + 1)
      }
    },
    [size, setSize]
  )

  return (
    <>
      {isLoading ? (
        <div className={styles.mainLoaderContainer}>
          <ClipLoader loading color='red' size={200} />
        </div>
      ) : (
        <main className={styles.main} onScroll={handleScroll} ref={scrollElement}>
          {array.map(pokemon => (
            <MemoizedCard key={pokemon.id} pokemon={pokemon} setPokemon={setPokemon} />
          ))}
          <div className={styles.loaderContainer}>
            <ClipLoader loading={isValidating} color='red' size={100} />
          </div>
        </main>
      )}
    </>
  )
}
