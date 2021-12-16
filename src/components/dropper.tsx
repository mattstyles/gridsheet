import {Upload, Star} from 'react-feather'
import * as React from 'react'
import {useState, useCallback} from 'react'
import cx from 'classnames'

import * as styles from './dropper.module.css'

type DropperProps = {
  onGetImageData: (image: ImageData) => void
}
export function Dropper({onGetImageData}: DropperProps) {
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
      handleImageDrop(event, onGetImageData)
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
  onComplete: DropperProps['onGetImageData']
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
  onComplete(data)
}

function getImageData(file: File): Promise<ImageData> {
  const reader = new FileReader()
  reader.readAsDataURL(file)

  return new Promise((resolve, reject) => {
    const image = document.createElement('img')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    reader.onerror = reject
    reader.onloadend = (event) => {
      image.src = event.target.result as string
      image.onerror = reject
      image.onload = () => {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0, image.width, image.height)
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height)

        resolve(data)
      }
    }
  })
}
