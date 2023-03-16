import { useContext } from 'react'

import { PokemonContextPokemon } from '@/contexts/PokemonContext'
import { firstLetterUpperCase } from '@/lib/functions'

import styles from './styles.module.scss'

export function AsideCardBack() {
  const pokemon = useContext(PokemonContextPokemon)!

  return (
    <>
      <div className={styles.statsContainer}>
        {pokemon.stats.map(({ base_stat, stat: { name } }) => (
          <span key={name} className={styles.stat}>
            {firstLetterUpperCase(name)} {base_stat}
          </span>
        ))}
      </div>
    </>
  )
}
