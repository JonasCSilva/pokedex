import { motion } from 'framer-motion'
import { useContext } from 'react'

import { PokemonContextPokemon } from '@/contexts/PokemonContext'
import { statsLimits } from '@/lib/consts'
import { firstLetterUpperCase } from '@/lib/functions'

import styles from './styles.module.scss'

export function AsideCardBack() {
  const pokemon = useContext(PokemonContextPokemon)!

  return (
    <>
      <div className={styles.statsContainer}>
        {pokemon.stats.map(({ base_stat, stat: { name } }) => (
          <div className={styles.statContainer} key={name}>
            <span key={name} className={styles.stat}>
              {firstLetterUpperCase(name)}
            </span>
            <div className={styles.bar}>
              <motion.div
                className={styles.subBar}
                initial={{ width: 0 }}
                animate={{ width: base_stat / statsLimits[name] * 100 + '%' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
