import {Upload, Star} from 'react-feather'
import * as React from 'react'
import {useState, useCallback} from 'react'
import cx from 'classnames'

import * as styles from './dropper.module.css'

const size = [260, 260]

type DropperProps = {
  setImage: (image: ImageData) => void
}
export function Dropper({setImage}: DropperProps) {
  const [isOver, setIsOver] = useState(false)

  const onDragEnter = useCallback(
    (event) => {
      event.preventDefault()
      setIsOver(true)
    },
    [setIsOver]
  )
  const onDrop = useCallback(
    (event) => {
      event.preventDefault()
      handleImageDrop(event, setImage)
      setIsOver(false)
    },
    [isOver, setIsOver]
  )
  return (
    <div
      className={cx(styles.container, isOver && styles['container-highlight'])}
      onDragEnter={onDragEnter}
      onDragLeave={() => setIsOver(false)}
      onDragOver={resetDragEvent}
      onDrop={onDrop}
    >
      {isOver ? <Star size={24} /> : <Upload size={24} />}
    </div>
  )
}

const resetDragEvent = (event: React.DragEvent) => {
  event.preventDefault()
}

async function handleImageDrop(
  event: React.DragEvent,
  setImage: DropperProps['setImage']
) {
  event.preventDefault()
  const dt = event.dataTransfer
  // For now we'll grab only 1 file
  const file = dt.files[0]

  if (!/image*/.test(file.type)) {
    console.warn('Only image file are supported')
    return
  }

  const data = await getImageData(file)
  setImage(data)
}

function getImageData(file: File): Promise<ImageData> {
  const reader = new FileReader()
  reader.readAsDataURL(file)

  return new Promise((resolve, reject) => {
    const image = document.createElement('img')
    const canvas = document.createElement('canvas')
    canvas.width = size[0]
    canvas.height = size[1]
    const ctx = canvas.getContext('2d')

    reader.onerror = reject
    reader.onloadend = (event) => {
      image.src = event.target.result as string
      image.onerror = reject
      image.onload = () => {
        console.log(image.width, image.height)
        ctx.drawImage(image, 0, 0, size[0], size[1])
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height)

        resolve(data)
      }
    }
  })
}
