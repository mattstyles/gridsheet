import {Upload, Star} from 'react-feather'
import * as React from 'react'
import {useState} from 'react'

import * as styles from './dropper.module.css'

export function Dropper() {
  const [isOver, setIsOver] = useState(false)
  return (
    <div
      className={styles.container}
      onDragEnter={() => setIsOver(true)}
      onDragExit={() => setIsOver(false)}
    >
      {isOver ? <Star size={24} /> : <Upload size={24} />}
    </div>
  )
}
