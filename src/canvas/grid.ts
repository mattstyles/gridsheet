type CanvasProps = {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
}
export function clearCanvas({ctx, width, height}: CanvasProps): void {
  ctx.clearRect(0, 0, width, height)
}

type GridProps = {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  gridSize: number
}
export function drawGrid({ctx, width, height, gridSize}: GridProps): void {
  console.log('drawing grid')
  ctx.strokeStyle = '#88888844'
  for (let i = 0; i <= width; i += gridSize) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, height)
    ctx.stroke()
  }

  for (let j = 0; j <= height; j += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, j)
    ctx.lineTo(width, j)
    ctx.stroke()
  }
}

type HighlightProps = {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  gridSize: number
}
export function drawHighlightCell({ctx, x, y, gridSize}: HighlightProps): void {
  ctx.fillStyle = '#FD0E3544'
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize)
  ctx.strokeStyle = '#FFFFFFFF'
  ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize)
}
