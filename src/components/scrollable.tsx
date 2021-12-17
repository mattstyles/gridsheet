import * as React from 'react'
import {useRef, useState} from 'react'
import cx from 'classnames'

import {Spacer} from './spacer'
import * as styles from './scrollable.module.css'

type ScrollableProps = {
  min: number
  max: number
  aspect: number
  children: React.ReactNode
}

export function Scrollable({children, min, max, aspect}: ScrollableProps) {
  const containerRef = useRef(null)
  const [scrollX, setScrollX] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const el = event.target as HTMLDivElement
    setScrollX(el.scrollLeft / (el.scrollWidth - el.offsetWidth))
    setScrollY(el.scrollTop / (el.scrollHeight - el.offsetHeight))
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div
          ref={containerRef}
          className={styles['image-container']}
          onScroll={onScroll}
          style={{aspectRatio: aspect + '', minWidth: min, maxWidth: max}}
        >
          {children}
        </div>
        <Spacer
          space={Spacer.space.small}
          direction={Spacer.direction.horizontal}
        />
        <ScrollIndicatorV perc={scrollY} />
      </div>
      <Spacer space={Spacer.space.small} />
      <div className={styles.row}>
        <ScrollIndicatorH perc={scrollX} max={max} />
      </div>
    </div>
  )
}

function ScrollIndicatorH({perc, max}: {perc: number; max: number}) {
  return (
    <div
      className={cx(styles.scrollTrack, styles.scrollH)}
      style={{maxWidth: max + 'px'}}
    >
      <div
        className={cx(styles.scrollIndicator, styles.scrollHIndicator)}
        style={{left: `calc(${perc * 100}% - (${perc} * 16px))`}}
      ></div>
    </div>
  )
}

function ScrollIndicatorV({perc}: {perc: number}) {
  return (
    <div className={cx(styles.scrollTrack, styles.scrollV)}>
      <div
        className={cx(styles.scrollIndicator, styles.scrollVIndicator)}
        style={{top: `calc(${perc * 100}% - (${perc} * 16px))`}}
      ></div>
    </div>
  )
}
