import { AnimatePresence, motion, Transition } from 'framer-motion'
import { useContext, useEffect, useRef, useState } from 'react'

import { SelectedPokemonContextPokemon } from '@/contexts/SelectedPokemonContext'

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
  const [isFront, setIsFront] = useState(true)
  const [show, setShow] = useState(false)
  const firstRender = useRef(true)

  useEffect(() => {
    firstRender.current = false
  }, [])

  return (
    <aside className={styles.aside}>
      <AnimatePresence
        onExitComplete={() => {
          setIsFront(prev => !prev)
        }}
      >
        {show ||
          (isFront && (
            <motion.main
              transition={transition}
              initial={!firstRender.current && { rotateY: 90 }}
              animate={{ rotateY: 0, transition }}
              exit={{ rotateY: 90 }}
              className={styles.main}
              key='front'
            >
              {pokemon && (
                <AsideCard isFront={true} setShow={setShow}>
                  <AsideCardFront />
                </AsideCard>
              )}
            </motion.main>
          ))}
        {!show ||
          (!isFront && (
            <motion.main
              key='back'
              transition={transition}
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0, transition }}
              exit={{ rotateY: 90 }}
              className={styles.main}
            >
              {pokemon && (
                <AsideCard isFront={false} setShow={setShow}>
                  <AsideCardBack />
                </AsideCard>
              )}
            </motion.main>
          ))}
      </AnimatePresence>
    </aside>
  )
}
