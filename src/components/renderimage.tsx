import * as React from 'react'
import {useRef, useEffect} from 'react'
import cx from 'classnames'
import {ref, useSnapshot} from 'valtio'

import {state} from '../state'
import {clearCanvas, drawGrid} from '../canvas/grid'
import * as styles from './renderimage.module.css'

export function RenderImage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const gridRef = useRef<HTMLCanvasElement | null>(null)
  const {renderWidth, renderHeight, gridSize, renderZoom} = useSnapshot(state)
  useEffect(() => {
    const canvas = canvasRef.current
    const grid = gridRef.current
    if (canvas == null || grid == null) {
      return
    }

    const ctx = grid.getContext('2d')
    clearCanvas({ctx, width: renderWidth, height: renderHeight})
    drawGrid({
      ctx,
      width: renderWidth,
      height: renderHeight,
      gridSize: gridSize,
    })

    const onClick = onCanvasClick(canvas.getContext('2d'))
    grid.addEventListener('click', onClick)

    state.renderCanvas = ref(canvas)

    return () => {
      grid.removeEventListener('click', onClick)
    }
  }, [canvasRef, renderWidth, renderHeight, gridSize])

  return (
    <div
      className={styles.container}
      style={{
        width: `${renderZoom * 100}%`,
        aspectRatio: `${renderWidth} / ${renderHeight}`,
      }}
    >
      <canvas
        className={cx('js-canvas', styles.canvas)}
        ref={canvasRef}
        width={renderWidth}
        height={renderHeight}
      ></canvas>
      <canvas
        className={cx('js-grid-canvas', styles.canvas)}
        ref={gridRef}
        width={renderWidth}
        height={renderHeight}
      ></canvas>
    </div>
  )
}

function onCanvasClick(ctx: CanvasRenderingContext2D) {
  return function onClick(event: MouseEvent) {
    if (state.sourceImage == null || state.sourceCell == null) {
      return
    }

    const el = event.target as HTMLCanvasElement

    const cellSize = (el.offsetWidth / state.renderWidth) * state.gridSize

    const {x, y} = {
      x: (event.offsetX / cellSize) | 0,
      y: (event.offsetY / cellSize) | 0,
    }
    const dest = {
      x: x * state.gridSize,
      y: y * state.gridSize,
    }
    const source = {
      x: state.sourceCell.x * state.gridSize,
      y: state.sourceCell.y * state.gridSize,
      w: state.gridSize,
      h: state.gridSize,
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
