import React from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import routes from '../routes'

const styles = (theme) => ({
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
  breadcrumbs: { 
    marginTop: 8,
    marginLeft: 16,
    marginBottom: 24
  },
})

function App({ classes, planetName, residentName}) {


  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>STAR WARS UI</Toolbar>
      </AppBar>
      <div id='breadcrumbs' className={classes.breadcrumbs}>
        <Breadcrumbs>
          <Link to='/'>Planets</Link>
          {planetName && <Link to={`/planets/${planetName}`}>{planetName}</Link>}
          {residentName && <Link to={`/residents/${residentName}`}>{residentName}</Link>}
        </Breadcrumbs>
      </div>
      <div className={classes.content}>
        {routes.map((route) => (

          <Route key={route.path} {...route} />
        ))}
      </div>
      {/* <footer>Luciano Paci © 2020</footer> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    planetName: state.residents.planetName,
    residentName: state.residents.residentName
  }
}

export default connect(mapStateToProps)(withStyles(styles)(App))
