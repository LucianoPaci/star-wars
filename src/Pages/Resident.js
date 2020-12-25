import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchResident,
  selectResident,
  selectPlanet,
} from '../state/residentsDucks'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import DisplayCard from '../components/DisplayCard'

function Resident({ match }) {
  const residentParam = match.params.id
  const { residentsList, resident: stateResident } = useSelector(
    (state) => state.residents
  )
  const selectedResident =
    residentsList?.find((resident) => resident.name === residentParam) ||
    stateResident

  const dispatch = useDispatch()

  useEffect(() => {
    // Cleanup. Remove resident and planet when unmounting
    return () => {
      dispatch(selectResident(''))
      dispatch(selectPlanet(''))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!selectedResident) {
      dispatch(fetchResident(residentParam))
    }
  }, [dispatch, match, match.params.id, residentParam, selectedResident])

  const renderResident = useMemo(() => {
    return selectedResident ? (
      <Grid item xs={6} key={residentParam}>
        <DisplayCard
          key={residentParam}
          title={selectedResident.name}
          content={selectedResident}
        />
      </Grid>
    ) : (
      <Grid item>
        <CircularProgress />
      </Grid>
    )
  }, [selectedResident, residentParam])

  return (
    <Grid container justify='space-evenly' alignItems='center'>
      {renderResident}
    </Grid>
  )
}

export default Resident
