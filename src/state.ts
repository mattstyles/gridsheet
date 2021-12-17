import {proxy} from 'valtio'

type State = {
  renderWidth: number
  renderHeight: number
  renderCanvas: HTMLCanvasElement | null
  renderZoom: number
  gridSize: number
  sourceImage: ImageData | null
  sourceTargetCell: {
    x: number
    y: number
  } | null
  asideWidth: number
}

export const state = proxy<State>({
  renderWidth: 640,
  renderHeight: 480,
  renderCanvas: null,
  renderZoom: 1,
  gridSize: 10,
  sourceImage: null,
  sourceTargetCell: null,
  asideWidth: 320,
})
