import * as React from 'react'

import {Main} from './main'
import {Aside} from './aside'
import * as styles from './app.module.css'

export function App() {
  return (
    <Container>
      <Main />
      <Aside />
    </Container>
  )
}

function Container({children}: {children: React.ReactNode}) {
  return <div className={styles.app}>{children}</div>
}
