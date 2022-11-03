import React from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import Layout from '../components/layout/layout'
import { Provider } from 'react-redux'
import '@yotpo-common/react-b2b-components/themes/theme.css';
import { YotpoAlert } from '@yotpo-common/react-b2b-components/alert';
import { store } from '../components/redux/store'
import { createRoot } from 'react-dom/client';

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

// let root = document.createElement('div')
// ReactDOM.render(<App />, root)

let container = document.createElement('app');
container.className = 'popup'
document.body.appendChild(container)

let root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App/>);