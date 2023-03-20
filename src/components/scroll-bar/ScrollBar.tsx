import { motion, useSpring } from 'framer-motion'
import { useContext, useEffect } from 'react'

import { ScrollContextProgress } from '@/contexts/ScrollContext'

import styles from './styles.module.scss'

export function Scrollbar() {
  const progress = useContext(ScrollContextProgress)!
  const scaleX = useSpring(progress, {
    stiffness: 200,
    damping: 30
  })

  scaleX.set(progress)

  return <motion.div className={styles.progressBar} style={{ scaleX }} />
}
