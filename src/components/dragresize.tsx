import * as React from 'react'
import cx from 'classnames'

import * as styles from './dragresize.module.css'

type DragProps = {
  onMove: (positionX: number) => void
}
export function DragResizeH({onMove}: DragProps) {
  const onDragStart = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const onDragEnd = () => {
      window.removeEventListener('mousemove', onDragMove)
      window.removeEventListener('mouseup', onDragEnd)
    }

    const onDragMove = (event: MouseEvent) => {
      onMove(event.clientX)
    }

    window.addEventListener('mousemove', onDragMove)
    window.addEventListener('mouseup', onDragEnd)
  }

  return (
    <div
      className={cx(styles.container, styles.horizontal)}
      onMouseDown={onDragStart}
    ></div>
  )
}
