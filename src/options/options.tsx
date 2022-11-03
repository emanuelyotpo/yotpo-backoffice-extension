import React from 'react'
import './options.css'
import { Provider } from 'react-redux'
import { YotpoAlert } from '@yotpo-common/react-b2b-components/alert'
import '@yotpo-common/react-b2b-components/themes/theme.css'
import OptionsLayout from './optionsComponenets/optionsLayout/optionsLayout'
import { store } from './optionsComponenets/Redux/store'
import { createRoot } from 'react-dom/client'

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

let container = document.createElement('app');
container.className = 'popup'
document.body.appendChild(container)

let root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App/>);
