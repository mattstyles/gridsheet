import * as React from 'react'
import {useSnapshot} from 'valtio'

import {state} from '../state'
import {Dropzone} from './dropzone'
import {Spacer} from './spacer'
import {DragResizeH} from './dragresize'
import * as styles from './aside.module.css'

export function Aside() {
  const {asideWidth} = useSnapshot(state)

  return (
    <div className={styles.aside} style={{width: asideWidth + 'px'}}>
      <DragResizeH onMove={onDrag} />
      <Spacer space={Spacer.space.small} />
      <Dropzone />
      <Spacer space={Spacer.space.large} />
    </div>
  )
}

const onDrag = (positionX: number) => {
  state.asideWidth = window.innerWidth - positionX
}
