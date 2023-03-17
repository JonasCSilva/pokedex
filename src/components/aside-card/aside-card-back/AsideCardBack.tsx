import { motion } from 'framer-motion'
import { useContext } from 'react'

import { SelectedPokemonContextPokemon } from '@/contexts/SelectedPokemonContext'
import { statsColors, statsLimits } from '@/lib/consts'
import { firstLetterUpperCase } from '@/lib/functions'

import styles from './styles.module.scss'

export function AsideCardBack() {
  const pokemon = useContext(SelectedPokemonContextPokemon)!

  return (
    <>
      <div className={styles.statsContainer}>
        {pokemon.stats.map(({ base_stat, stat: { name } }) => (
          <div className={styles.statContainer} key={name}>
            <span key={name} className={styles.stat}>
              {firstLetterUpperCase(name)}: <b>{base_stat}</b>
            </span>
            <div className={styles.bar}>
              <motion.div
                className={styles.subBar}
                initial={{ width: 0 }}
                animate={{ width: Math.ceil((base_stat / statsLimits[name]) * 100) + '%' }}
                transition={{ duration: 0.5 }}
                style={{ backgroundColor: statsColors[name] }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
