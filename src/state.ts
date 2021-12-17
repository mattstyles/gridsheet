import {proxy} from 'valtio'
import {Point} from './canvas/shape'

type State = {
  renderWidth: number
  renderHeight: number
  renderCanvas: HTMLCanvasElement | null
  renderZoom: number
  gridSize: number
  sourceImage: ImageData | null
  sourceCell: Point | null
  asideWidth: number
}

export const state = proxy<State>({
  renderWidth: 640,
  renderHeight: 480,
  renderCanvas: null,
  renderZoom: 1,
  gridSize: 10,
  sourceImage: null,
  sourceCell: null,
  asideWidth: 320,
})
