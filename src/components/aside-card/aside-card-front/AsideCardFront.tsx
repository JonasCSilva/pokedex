import { useContext } from 'react'

import { SelectedPokemonContextPokemon } from '@/contexts/SelectedPokemonContext'
import { typesColors } from '@/lib/consts'
import { firstLetterUpperCase } from '@/lib/functions'

import styles from './styles.module.scss'

export function AsideCardFront() {
  const { types, weight, base_experience, height, abilities } = useContext(SelectedPokemonContextPokemon)!

  return (
    <>
      <div className={styles.typesContainer}>
        {types.map(({ type: { name } }) => (
          <span key={name} className={styles.type} style={{ backgroundColor: typesColors[name] }}>
            {name.toUpperCase()}
          </span>
        ))}
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.stat}>
          <h4>WEIGHT</h4>
          <h5>{weight / 10} Kg</h5>
        </div>
        <div className={styles.stat}>
          <h4>BASE EXP</h4>
          <h5>{base_experience}</h5>
        </div>
        <div className={styles.stat}>
          <h4>HEIGHT</h4>
          <h5>{height / 10} m</h5>
        </div>
      </div>
      <div className={styles.abilitiesContainer} style={{ columnGap: abilities.length > 2 ? '1rem' : undefined }}>
        {abilities.map(({ ability: { name } }) => (
          <span key={name} className={styles.ability}>
            {firstLetterUpperCase(name)}
          </span>
        ))}
      </div>
    </>
  )
}
