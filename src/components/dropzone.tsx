import * as React from 'react'
import {useSnapshot, ref} from 'valtio'

import {state} from '../state'
import {Dropper} from './dropper'
import {SourceImage} from './sourceimage'

export function Dropzone() {
  const {sourceImage, sourceCell} = useSnapshot(state)

  return sourceImage == null ? (
    <Dropper onGetImageData={setSourceImage} />
  ) : (
    <SourceImage image={sourceImage} sourceCell={sourceCell} />
  )
}

const setSourceImage = (image: ImageData) => {
  state.sourceImage = ref(image)
}
