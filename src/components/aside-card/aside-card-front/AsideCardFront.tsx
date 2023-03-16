import { useContext } from 'react'

import { PokemonContextPokemon } from '@/contexts/PokemonContext'
import { firstLetterUpperCase } from '@/lib/functions'
import { typesColors } from '@/lib/typesColors'

import styles from './styles.module.scss'

export function AsideCardFront() {
  const pokemon = useContext(PokemonContextPokemon)!

  return (
    <>
      <div className={styles.typesContainer}>
        {pokemon.types.map(({ type: { name } }) => (
          <span key={name} className={styles.type} style={{ backgroundColor: typesColors[name] }}>
            {name.toUpperCase()}
          </span>
        ))}
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.stat}>
          <h4>WEIGHT</h4>
          <h5>{pokemon.weight / 10} Kg</h5>
        </div>
        <div className={styles.stat}>
          <h4>BASE EXP</h4>
          <h5>{pokemon.base_experience}</h5>
        </div>
        <div className={styles.stat}>
          <h4>HEIGHT</h4>
          <h5>{pokemon.height / 10} m</h5>
        </div>
      </div>
      <div
        className={styles.abilitiesContainer}
        style={{ columnGap: pokemon.abilities.length > 2 ? '1rem' : undefined }}
      >
        {pokemon.abilities.map(({ ability: { name } }) => (
          <span key={name} className={styles.ability}>
            {firstLetterUpperCase(name)}
          </span>
        ))}
      </div>
    </>
  )
}
