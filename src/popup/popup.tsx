import React from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import Layout from '../components/layout/layout'
import { Provider } from 'react-redux'
import { store } from '../components/Redux/store'

let layout = <Layout/>

const App: React.FC<{}> = () => {
    return (
        <Provider store={store}>
        <Layout/>
        </Provider>
    )
}

let root = document.createElement('div')
root.className = "main"
document.body.appendChild(root)
ReactDOM.render(<App />, root)
