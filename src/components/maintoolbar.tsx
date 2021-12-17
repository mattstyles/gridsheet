import * as React from 'react'
import {useSnapshot} from 'valtio'

import {state} from '../state'
import * as styles from './maintoolbar.module.css'

export function MainToolbar() {
  return (
    <div className={styles.toolbar}>
      <ZoomInput />
      <Spacer />
      <button onClick={onSave}>Save</button>
    </div>
  )
}

const onZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  state.renderZoom = parseFloat(event.target.value)
}
function ZoomInput() {
  const {renderZoom} = useSnapshot(state)
  return (
    <input
      type='range'
      id='zoom'
      name='Zoom'
      min='1'
      max='4'
      step='0.2'
      value={renderZoom}
      onChange={onZoomChange}
    />
  )
}

function Spacer() {
  return <div className={styles.spacer}></div>
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
