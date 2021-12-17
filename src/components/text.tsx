import * as React from 'react'
import cx from 'classnames'

import * as styles from './text.module.css'

enum Size {
  small,
  medium,
  large,
}

enum El {
  span = 'span',
  div = 'div',
}

type TextProps = {
  size?: Size
  el?: El
  children: React.ReactNode
}
export function Text({el = El.span, children, size = Size.medium}: TextProps) {
  const props = {
    className: cx(
      styles.type,
      size === Size.small && styles.small,
      size === Size.medium && styles.medium,
      size === Size.large && styles.large
    ),
  }

  if (el === El.span) {
    return <span {...props}>{children}</span>
  }

  if (el === El.div) {
    return <div {...props}>{children}</div>
  }
}
Text.size = Size
Text.el = El
