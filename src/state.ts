import {proxy} from 'valtio'

type State = {
  renderWidth: number
  renderHeight: number
  gridSize: number
}

export const state = proxy<State>({
  renderWidth: 640,
  renderHeight: 480,
  gridSize: 10,
})
