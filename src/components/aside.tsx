import * as React from 'react'

import {Dropper} from './dropper'
import {Spacer} from './spacer'
import * as styles from './aside.module.css'

export function Aside() {
  return (
    <div className={styles.aside}>
      <p>Put things here</p>
      <Spacer space={Spacer.space.small} />
      <Dropper />
    </div>
  )
}
