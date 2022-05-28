import React from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import Layout from '../components/layout/layout'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from '../components/Redux/store'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AppData } from '../components/Redux/AppData'

export default function App() {
  const theme = createTheme({
    typography: {
      fontFamily: `"Inter", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout />
      </Provider>
    </ThemeProvider>
  )
}

let root = document.createElement('div')
root.className = 'popup'
document.body.appendChild(root)
ReactDOM.render(<App />, root)
