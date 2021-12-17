import {render} from 'react-dom'
import * as React from 'react'

import {App} from './components/app'
import {setKeyHandlers} from './keys'

const root = document.querySelector('.js-root')
setKeyHandlers()

render(<App />, root)
