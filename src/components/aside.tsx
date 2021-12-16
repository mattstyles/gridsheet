import * as React from 'react'

import {state} from '../state'
import {Dropzone} from './dropzone'
import {Spacer} from './spacer'
import * as styles from './aside.module.css'

export function Aside() {
  return (
    <div className={styles.aside}>
      <p>Put things here</p>
      <Spacer space={Spacer.space.small} />
      <Dropzone />
      <Spacer space={Spacer.space.large} />
      <button onClick={onSave}>Save</button>
    </div>
  )
}

function onSave() {
  if (state.renderCanvas == null) {
    return
  }

  const url = state.renderCanvas.toDataURL()

  const link = document.createElement('a')
  link.download = 'test.png'
  link.href = url
  link.click()
}
