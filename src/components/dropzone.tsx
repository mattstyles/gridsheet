import * as React from 'react'
import {useState, useRef, useEffect} from 'react'

import {Dropper} from './dropper'

export function Dropzone() {
  const [image, setImage] = useState<ImageData>(null)

  return image == null ? (
    <Dropper setImage={setImage} />
  ) : (
    <RenderImage image={image} />
  )
}

function RenderImage({image}) {
  const canvasRef = useRef(null)
  useEffect(() => {
    if (canvasRef == null) {
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    // ctx.drawImage(image, 0, 0)
    ctx.putImageData(image, 0, 0)
  }, [canvasRef, image])

  return <canvas width={260} height={260} ref={canvasRef}></canvas>
}
