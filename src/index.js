import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './Layout/App'

import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import theme from './styles/theme'


import configureStore from './state/store'

const store = configureStore(window.REDUX_INITIAL_DATA)

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}> 
      <App />
      </ThemeProvider>
        
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
