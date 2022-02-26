import React from 'react'
import ReactDOM from 'react-dom'
import './popup.css'

let test = <img src='icon.png'/>

let root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(test, root)