import { AnimatePresence, motion, Transition } from 'framer-motion'
import { useContext, useEffect, useRef, useState } from 'react'

import { PokemonContextPokemon } from '@/contexts/PokemonContext'

import { AsideCard } from '../aside-card/AsideCard'
import styles from './styles.module.scss'

const transition: Transition = {
  type: 'tween',
  duration: 0.35
}

export function Aside() {
  const pokemon = useContext(PokemonContextPokemon)
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
              key='front'
            >
              {pokemon && <AsideCard pokemon={pokemon} isFront={true} setShow={setShow} />}
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
            >
              {pokemon && <AsideCard pokemon={pokemon} isFront={false} setShow={setShow} />}
            </motion.main>
          ))}
      </AnimatePresence>
    </aside>
  )
}
