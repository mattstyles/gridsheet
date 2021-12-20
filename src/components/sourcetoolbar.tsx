import * as React from 'react'

import {state} from '../state'
import * as styles from './sourcetoolbar.module.css'

export function SourceToolbar() {
  return (
    <div className={styles.toolbar}>
      <Separator />
      <button onClick={onSourceClear}>Clear</button>
    </div>
  )
}

function onSourceClear() {
  state.sourceImage = null
  state.sourceCell = null
}

function Separator() {
  return <div className={styles.spacer}></div>
}
