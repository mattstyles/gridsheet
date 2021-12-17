import * as React from 'react'
import {useSnapshot} from 'valtio'

import {state} from '../state'
import {Scrollable} from './scrollable'
import {RenderImage} from './renderimage'
import * as styles from './main.module.css'

export function Main() {
  const {renderWidth, renderHeight} = useSnapshot(state)
  return (
    <div className={styles.container}>
      <Scrollable max={800} min={400} aspect={renderWidth / renderHeight}>
        <RenderImage />
      </Scrollable>
    </div>
  )
}
