import React from 'react'
import ReactDOM from 'react-dom'
import './options.css'
import { Provider } from 'react-redux'
import { YotpoAlert } from '@yotpo-common/react-b2b-components/alert'
import '@yotpo-common/react-b2b-components/themes/theme.css'
import OptionsLayout from './optionsComponenets/optionsLayout/optionsLayout'
import { store } from './optionsComponenets/Redux/store'

export default function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <YotpoAlert />
        <OptionsLayout />
      </Provider>
    </React.StrictMode>
  )
}

let root = document.createElement('div')
root.className = 'options'
document.body.appendChild(root)
ReactDOM.render(<App />, root)
