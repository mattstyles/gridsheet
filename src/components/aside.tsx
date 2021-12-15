import * as React from 'react'

import {Dropzone} from './dropzone'
import {Spacer} from './spacer'
import * as styles from './aside.module.css'

export function Aside() {
  return (
    <div className={styles.aside}>
      <p>Put things here</p>
      <Spacer space={Spacer.space.small} />
      <Dropzone />
    </div>
  )
}
