import React from 'react'
import ReactDOM from 'react-dom'

let test = <p>Hello World!</p>

let root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(test, root)
