import { makeStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import routes from '../routes'
import PlanetList from '../Pages/PlanetList'
import { Route } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.main,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    overflow: 'auto',
  },
}))

function App() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>STAR WARS UI</Toolbar>
      </AppBar>
      <div>
        BREADCRUMBS
        </div>
      <div className={classes.content}>
        {routes.map(route => (
          <Route key={route.path} {...route}/>
        ))}
      </div>
      {/* <footer>Luciano Paci © 2020</footer> */}
    </div>
  )
}

export default App
