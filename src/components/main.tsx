import * as React from 'react'

import {RenderImage} from './renderimage'
import * as styles from './main.module.css'

export function Main() {
  return (
    <div className={styles.container}>
      <RenderImage />
    </div>
  )
}
