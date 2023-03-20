import { AnimatePresence, motion, Transition } from 'framer-motion'
import { useContext, useEffect, useRef, useState } from 'react'

import { SelectedPokemonContextPokemon } from '@/contexts/SelectedPokemonContext'
import { Side } from '@/lib/types'

import { AsideCard } from '../aside-card/AsideCard'
import { AsideCardBack } from '../aside-card/aside-card-back/AsideCardBack'
import { AsideCardFront } from '../aside-card/aside-card-front/AsideCardFront'
import styles from './styles.module.scss'

const transition: Transition = {
  type: 'tween',
  duration: 0.35
}

export function Aside() {
  const pokemon = useContext(SelectedPokemonContextPokemon)
  const [side, setSide] = useState(Side.front)
  const firstRender = useRef(true)

  useEffect(() => {
    firstRender.current = false
  }, [])

  return (
    <aside className={styles.aside}>
      <AnimatePresence
        onExitComplete={() => {
          if (side === Side.flippingFromBack) {
            setSide(Side.front)
          } else if (side === Side.flippingFromFront) {
            setSide(Side.back)
          }
        }}
      >
        {side === Side.front && (
          <motion.main
            transition={transition}
            initial={!firstRender.current && { rotateY: 90 }}
            animate={{ rotateY: 0, transition }}
            exit={{ rotateY: 90 }}
            className={styles.main}
            key={Side.front}
          >
            {pokemon && (
              <AsideCard side={Side.front} setSide={setSide}>
                <AsideCardFront />
              </AsideCard>
            )}
          </motion.main>
        )}
        {side === Side.back && (
          <motion.main
            key={Side.back}
            transition={transition}
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0, transition }}
            exit={{ rotateY: 90 }}
            className={styles.main}
          >
            {pokemon && (
              <AsideCard side={Side.back} setSide={setSide}>
                <AsideCardBack />
              </AsideCard>
            )}
          </motion.main>
        )}
      </AnimatePresence>
    </aside>
  )
}
