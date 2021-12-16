import {proxy} from 'valtio'

type State = {
  renderWidth: number
  renderHeight: number
  renderCanvas: HTMLCanvasElement | null
  gridSize: number
  sourceImage: ImageData | null
  sourceTargetCell: {
    x: number
    y: number
  } | null
}

export const state = proxy<State>({
  renderWidth: 640,
  renderHeight: 480,
  renderCanvas: null,
  gridSize: 10,
  sourceImage: null,
  sourceTargetCell: null,
})
