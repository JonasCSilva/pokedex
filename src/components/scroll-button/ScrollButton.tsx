import { motion } from 'framer-motion'
import { BsArrowUp } from 'react-icons/bs'

import styles from './styles.module.scss'

export function ScrollButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button onClick={onClick} className={styles.button} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <BsArrowUp size={'1.5rem'} />
    </motion.button>
  )
}
