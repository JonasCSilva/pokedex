import { Card } from '../(card)/Card'
import { Pokemon } from '../types'
import styles from './styles.module.scss'

async function getData(): Promise<Pokemon[]> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=90', { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const { results } = await res.json()

  const promises = []

  for (const result of results) {
    promises.push(fetch(result.url, { cache: 'no-store' }).then(res => res.json()))
  }

  return Promise.all(promises)
}

export async function List() {
  const pokemon = await getData()

  return (
    <main className={styles.main}>
      {pokemon.map(pokemon => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
    </main>
  )
}
