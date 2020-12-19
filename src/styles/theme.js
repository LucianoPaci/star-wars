import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#039be5',
    },
    secondary: {
      main: '#ab47bc',
    },
    background: {
      main: '#e0e0e0'
    }
  },
  typography: {
    fontFamily: [
      'Lato',
      'Roboto'
    ].join(','),
  },
})

export default theme
