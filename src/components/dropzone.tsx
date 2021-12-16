import * as React from 'react'
import {useRef, useEffect} from 'react'
import {useSnapshot, ref} from 'valtio'

import {state} from '../state'
import {Dropper} from './dropper'
import {drawGrid, drawHighlightCell, clearCanvas} from '../canvas/grid'
import * as styles from './dropzone.module.css'

export function Dropzone() {
  const {sourceImage, sourceTargetCell} = useSnapshot(state)

  return sourceImage == null ? (
    <Dropper onGetImageData={setSourceImage} />
  ) : (
    <RenderImage image={sourceImage} highlightCell={sourceTargetCell} />
  )
}

const setSourceImage = (image: ImageData) => {
  state.sourceImage = ref(image)
}

function RenderImage({
  image,
  highlightCell,
}: {
  image: ImageData
  highlightCell: {x: number; y: number}
}) {
  const canvasRef = useRef(null)
  const gridRef = useRef(null)
  useEffect(() => {
    if (canvasRef.current == null || gridRef.current == null) {
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.putImageData(image, 0, 0)

    const gridCtx = gridRef.current.getContext('2d')
    clearCanvas({ctx: gridCtx, width: image.width, height: image.height})
    drawGrid({
      ctx: gridCtx,
      width: image.width,
      height: image.height,
      gridSize: 10,
    })

    if (highlightCell != null) {
      drawHighlightCell({
        ctx: gridCtx,
        x: highlightCell.x,
        y: highlightCell.y,
        gridSize: 10,
      })
    }
  }, [canvasRef, image, highlightCell, gridRef])

  return (
    <div className={styles.container}>
      <canvas
        className={styles['dropzone-image']}
        width={image.width}
        height={image.height}
        ref={canvasRef}
      ></canvas>
      <canvas
        className={styles['dropzone-image']}
        width={image.width}
        height={image.height}
        ref={gridRef}
        onClick={onImageClick(image)}
      ></canvas>
    </div>
  )
}

function onImageClick(image: ImageData) {
  return function onClick(event: React.MouseEvent<HTMLCanvasElement>) {
    const ne = event.nativeEvent
    const el = event.target as HTMLCanvasElement

    const gridSize = 10
    const cellSize = (el.offsetWidth / image.width) * gridSize

    const {x, y} = {
      x: (ne.offsetX / cellSize) | 0,
      y: (ne.offsetY / cellSize) | 0,
    }

    // Set source target cell
    state.sourceTargetCell = {x, y}
  }
}
