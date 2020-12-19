import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import Pagination from '@material-ui/lab/Pagination'
import Card from '../components/ActionCard'
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded'
import { fetchList } from '../state/planetsDucks'
import { makeStyles } from '@material-ui/styles'
import { IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
    height: '60px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: -30,
    position: 'fixed',
    bottom: 'auto',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      margin: 0,
    },
  },
  content: {
    height: 800,
    [theme.breakpoints.down('xs')]: {
      height: 600,
    },
  },
}))

function PlanetList() {
  // const [list, setList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const classes = useStyles()

  useEffect(() => {
    dispatch(fetchList(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const handlePaginationClick = (event, number) => {
    setCurrentPage(number)
  }
  const handleOnClick = useCallback((name) => {
    console.log('Clicked ', name)
  }, [])

  const dispatch = useDispatch()

  const list = useSelector((store) => store.planets.planetsList)
  const loading = useSelector((store) => store.planets.loading)
  const count = useSelector((store) => store.planets.count)

  return (
    <>
      <div className={classes.content}>
        <Grid container justify='space-evenly' alignItems='center'>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {list.map((item) => (
                <Grid item xs={5} key={item.name}>
                  <Tooltip title={item.name}>
                    <Card
                      data={item}
                      name={item.name}
                      onClickCard={handleOnClick}
                      hint={`Click to see ${item.name} inhabitants`}
                      content={`Climate: ${item.climate}`}
                    />
                  </Tooltip>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </div>
      <div className={classes.footer}>
        <Pagination
          count={count / 10}
          color='secondary'
          onChange={handlePaginationClick}
        />
      </div>
    </>
  )
}

PlanetList.propTypes = {}

export default PlanetList
