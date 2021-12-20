import * as React from 'react'
import {useState, useCallback} from 'react'
import {useSnapshot} from 'valtio'

import {state} from '../state'
import {Text} from './text'
import {Spacer} from './spacer'
import * as styles from './maintoolbar.module.css'

export function MainToolbar() {
  const {renderWidth, renderHeight} = useSnapshot(state)
  return (
    <div className={styles.toolbar}>
      <ZoomInput />
      <Spacer
        space={Spacer.space.medium}
        direction={Spacer.direction.horizontal}
      />
      <InputGroup>
        <Text>Width</Text>
        <Spacer
          space={Spacer.space.small}
          direction={Spacer.direction.horizontal}
        />
        <NumberInput
          initialValue={renderWidth}
          onChange={(value) => {
            state.renderWidth = value
          }}
        />
      </InputGroup>
      <Spacer
        space={Spacer.space.medium}
        direction={Spacer.direction.horizontal}
      />
      <InputGroup>
        <Text>Height</Text>
        <Spacer
          space={Spacer.space.small}
          direction={Spacer.direction.horizontal}
        />
        <NumberInput
          initialValue={renderHeight}
          onChange={(value) => {
            state.renderHeight = value
          }}
        />
      </InputGroup>
      <Separator />
      <button onClick={onSave}>Save</button>
    </div>
  )
}

const onZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  state.renderZoom = parseFloat(event.target.value)
}
function ZoomInput() {
  const {renderZoom} = useSnapshot(state)
  return (
    <input
      type='range'
      id='zoom'
      name='Zoom'
      min='1'
      max='4'
      step='0.2'
      value={renderZoom}
      onChange={onZoomChange}
    />
  )
}

function NumberInput({
  onChange,
  initialValue,
}: {
  onChange: (value: number) => void
  initialValue: number
}) {
  const [localValue, setLocalValue] = useState(initialValue)

  const onLocalChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value)
      setLocalValue(value)
    },
    [setLocalValue, initialValue]
  )
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        onChange(localValue)
      }
    },
    [localValue]
  )
  const onBlur = useCallback(() => {
    onChange(localValue)
  }, [localValue])

  return (
    <input
      className={styles.numberInput}
      type='number'
      value={localValue}
      onChange={onLocalChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  )
}

function Separator() {
  return <div className={styles.spacer}></div>
}

function onSave() {
  if (state.renderCanvas == null) {
    return
  }

  const url = state.renderCanvas.toDataURL()

  const link = document.createElement('a')
  link.download = 'test.png'
  link.href = url
  link.click()
}

function InputGroup({children}: {children: React.ReactNode}) {
  return <div className={styles.inputGroup}>{children}</div>
}
