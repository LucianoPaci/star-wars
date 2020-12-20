import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './Layout/App'
import theme from './styles/theme'
import configureStore from './state/store'

const store = configureStore(window.REDUX_INITIAL_DATA)

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
