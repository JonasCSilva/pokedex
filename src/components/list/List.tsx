import { Dispatch, memo, SetStateAction, UIEventHandler, useCallback, useEffect, useMemo, useRef } from 'react'
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite'
import ClipLoader from 'react-spinners/ClipLoader'
import styles from './styles.module.scss'
import { Card } from '../card/Card'
import { Pokemon } from '../../lib/types'

const SIZE = 24
const LIMIT = 400 /* 1010 */

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
  const response = await fetchGraphQL(
    `{
      pokemon: pokemon_v2_pokemon(limit: ${SIZE}, offset: ${key}) {
        name
        id
        weight
        height
        base_experience
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
        abilities: pokemon_v2_pokemonabilities {
          ability: pokemon_v2_ability {
            name
          }
        }
      }
    }`
  )

  return response.data.pokemon
}

const getKey: SWRInfiniteKeyLoader = (index: number) => `${SIZE * index}`

export function List({
  setPokemon,
  setProgess
}: {
  setPokemon: Dispatch<SetStateAction<Pokemon | null>>
  setProgess: Dispatch<SetStateAction<number>>
}) {
  const { data, isLoading, isValidating, size, setSize } = useSWRInfinite(getKey, getPokemon, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateAll: false
  })
  const scrollElementRef = useRef<HTMLElement>(null)

  const array: Pokemon[] = useMemo(() => {
    const array: Pokemon[] = []
    if (!data) return array
    return array.concat(...data)
  }, [data])

  useEffect(() => {
    if (!scrollElementRef.current || !data || data?.length == 0) return
    const { scrollTop, offsetHeight } = scrollElementRef.current
    const size = ([] as Pokemon[]).concat(...data).length / SIZE

    const current = scrollTop + offsetHeight
    const target = SIZE * (size / 4) * (21 * 16 + 32) + 120 + 64

    if (SIZE * (size + 1) < LIMIT) {
      setProgess((current - offsetHeight) / (target - offsetHeight))
    } else {
      setProgess((current - offsetHeight) / (target - 120 - offsetHeight))
    }
  }, [data, setProgess])

  const handleScroll: UIEventHandler<HTMLElement> = useCallback(
    event => {
      const { scrollTop, offsetHeight } = event.currentTarget

      const current = scrollTop + offsetHeight
      const target = SIZE * (size / 4) * (21 * 16 + 32) + 120 + 64

      if (current >= target && SIZE * (size + 1) < LIMIT) {
        setSize(prev => prev + 1)
      }

      if (SIZE * (size + 1) < LIMIT) {
        setProgess((current - offsetHeight) / (target - offsetHeight))
      } else {
        setProgess((current - offsetHeight) / (target - 120 - offsetHeight))
      }
    },
    [size, setSize, setProgess]
  )

  return (
    <>
      {isLoading ? (
        <div className={styles.mainLoaderContainer}>
          <ClipLoader loading color='red' size={200} />
        </div>
      ) : (
        <main className={styles.main} onScroll={handleScroll} ref={scrollElementRef}>
          {array.map(pokemon => (
            <MemoizedCard key={pokemon.id} pokemon={pokemon} setPokemon={setPokemon} />
          ))}
          {SIZE * (size + 1) < LIMIT && (
            <div className={styles.loaderContainer}>
              {isValidating && <ClipLoader loading color='red' size={100} />}
            </div>
          )}
        </main>
      )}
    </>
  )
}
