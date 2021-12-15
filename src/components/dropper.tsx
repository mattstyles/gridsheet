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
      console.log('dropped', setImage)
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

const resetDragEvent = (event) => {
  event.preventDefault()
}

/**
 * For now we will make some assumptions about the drop event
 */
function handleImageDrop(event, setImage: DropperProps['setImage']) {
  event.preventDefault()
  const dt = event.dataTransfer
  const file = dt.files[0]

  console.log(file)
  console.log(file.type)
  console.log(file.name)

  // Read the file
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = (e) => {
    const image = document.createElement('img')
    image.src = e.target.result as string
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = size[0]
      canvas.height = size[1]
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, size[0], size[1])
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height)

      console.log(data)

      setImage(data)
    }
  }
}
