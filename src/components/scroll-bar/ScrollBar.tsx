import { ScrollContextProgess } from '@/contexts/ScrollContext'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import styles from './styles.module.scss'

export function Scrollbar() {
  const progess = useContext(ScrollContextProgess)!

  return <motion.div className={styles.progressBar} style={{ scaleX: progess }} />
}
