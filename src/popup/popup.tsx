import React from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import Layout from '../components/layout/layout'
import { Provider } from 'react-redux'
import { store } from '../components/Redux/store'
import '@yotpo-common/react-b2b-components/themes/theme.css';
import { YotpoAlert } from '@yotpo-common/react-b2b-components/alert';

export default function App() {

  return (
    <React.StrictMode>
        <Provider store={store}>
        <YotpoAlert/>
          <Layout/>
        </Provider>
    </React.StrictMode>
  )
}

let root = document.createElement('div')
root.className = 'popup'
document.body.appendChild(root)
ReactDOM.render(<App />, root)
