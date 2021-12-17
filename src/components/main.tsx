import * as React from 'react'
import {useRef, useEffect} from 'react'
import cx from 'classnames'
import {ref} from 'valtio'

import {state} from '../state'
import {clearCanvas, drawGrid} from '../canvas/grid'
import * as styles from './main.module.css'

export function Main() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const gridRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const grid = gridRef.current
    if (canvas == null || grid == null) {
      return
    }

    const ctx = grid.getContext('2d')
    clearCanvas({ctx, width: state.renderWidth, height: state.renderHeight})
    drawGrid({
      ctx,
      width: state.renderWidth,
      height: state.renderHeight,
      gridSize: state.gridSize,
    })

    const onClick = onCanvasClick(canvas.getContext('2d'))
    grid.addEventListener('click', onClick)

    state.renderCanvas = ref(canvas)

    return () => {
      grid.removeEventListener('click', onClick)
    }
  }, [canvasRef])

  return (
    <div
      className={styles.container}
      style={{
        width: state.renderWidth + 'px',
        height: state.renderHeight + 'px',
      }}
    >
      <canvas
        className={cx('js-canvas', styles.canvas)}
        ref={canvasRef}
        width={state.renderWidth}
        height={state.renderHeight}
      ></canvas>
      <canvas
        className={cx('js-grid-canvas', styles.canvas)}
        ref={gridRef}
        width={state.renderWidth}
        height={state.renderHeight}
      ></canvas>
    </div>
  )
}

function onCanvasClick(ctx: CanvasRenderingContext2D) {
  return function onClick(event: MouseEvent) {
    if (state.sourceImage == null || state.sourceTargetCell == null) {
      return
    }

    const el = event.target as HTMLCanvasElement

    const gridSize = 10
    const cellSize = (el.offsetWidth / state.renderWidth) * gridSize

    const {x, y} = {
      x: (event.offsetX / cellSize) | 0,
      y: (event.offsetY / cellSize) | 0,
    }
    const dest = {
      x: x * gridSize,
      y: y * gridSize,
    }
    const source = {
      x: state.sourceTargetCell.x * gridSize,
      y: state.sourceTargetCell.y * gridSize,
      w: gridSize,
      h: gridSize,
    }

    ctx.putImageData(
      state.sourceImage,
      dest.x - source.x,
      dest.y - source.y,
      source.x,
      source.y,
      source.w,
      source.h
    )
  }
}
