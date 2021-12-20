import {state} from './state'
import {Rect, Point} from './canvas/shape'

/**
 * For now key events are global
 */
export function setKeyHandlers() {
  document.body.addEventListener('keydown', keyHandler, false)
  return () => {
    document.body.removeEventListener('keydown', keyHandler, false)
  }
}

function keyHandler(event: KeyboardEvent): void {
  switch (event.key) {
    case 'ArrowLeft':
    case 'a':
      validateSourceCell(setSourceCellLeft)
      break

    case 'ArrowRight':
    case 'd':
      validateSourceCell(setSourceCellRight)
      break

    case 'ArrowUp':
    case 'w':
      validateSourceCell(setSourceCellUp)
      break

    case 'ArrowDown':
    case 's':
      validateSourceCell(setSourceCellDown)
      break
  }
}

function validateSourceCell(fn: (dim: Rect, source: Point) => void) {
  const {sourceImage, sourceCell, gridSize} = state

  if (sourceImage == null || sourceCell == null) {
    return
  }

  fn(
    new Rect(
      0,
      0,
      Math.ceil(sourceImage.width / gridSize),
      Math.ceil(sourceImage.height / gridSize)
    ),
    sourceCell
  )
}

function setSourceCellLeft(_: Rect, source: Point) {
  if (source.x === 0) {
    return
  }

  state.sourceCell = new Point(source.x - 1, source.y)
}

function setSourceCellRight(dim: Rect, source: Point) {
  if (source.y === dim.w) {
    return
  }

  state.sourceCell = new Point(source.x + 1, source.y)
}

function setSourceCellUp(_: Rect, source: Point) {
  if (source.y === 0) {
    return
  }

  state.sourceCell = new Point(source.x, source.y - 1)
}

function setSourceCellDown(dim: Rect, source: Point) {
  if (source.y === dim.h) {
    return
  }

  state.sourceCell = new Point(source.x, source.y + 1)
}
