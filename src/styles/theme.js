import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#039be5',
    },
    secondary: {
      main: '#ab47bc',
    },
  },
  typography: {
    fontFamily: [
      'Lato',
      'Roboto'
    ].join(','),
  },
})

export default theme
