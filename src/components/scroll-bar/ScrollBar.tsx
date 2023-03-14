import { motion } from 'framer-motion'
import styles from './styles.module.scss'

export function Scrollbar({ progess }: { progess: number }) {
  return <motion.div className={styles.progressBar} style={{ scaleX: progess }} />
}
