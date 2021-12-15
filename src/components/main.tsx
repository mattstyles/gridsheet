import * as React from 'react'
import {useRef, useEffect} from 'react'
import cx from 'classnames'

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
