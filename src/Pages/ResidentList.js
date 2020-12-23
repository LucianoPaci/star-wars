import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchList, fetchPlanet, selectPlanet } from '../state/residentsDucks'

import Grid from '@material-ui/core/Grid'
import Card from '../components/ActionCard'

/**
 *
 * @param {*} match
 * @description Custom Hook. Retrieves the selected planet
 */
const usePlanet = (match) => {
  // Check if planet is available in pagination, so we don't have to fetch it again.
  const { planetsById } = useSelector((state) => state.planets)
  const { planet } = useSelector((state) => state.residents)

  if (planetsById && planetsById[match.params.id]) {
    return planetsById[match.params.id]
  } else if (planet && planet.name === match.params.id) {
    return planet
  } else {
    return null
  }
}

function ResidentList({ match }) {
  const { planetName, residentsList, [planetName]: residents } = useSelector(
    (store) => store.residents
  )

  const history = useHistory()
  const dispatch = useDispatch()
  const [message, setMessage] = useState()
  let planet = usePlanet(match)

  // fetch planet from params
  useEffect(() => {
    if (!planetName || planetName !== match.params.id) {
      dispatch(selectPlanet(match.params.id))
    }
  }, [match.params.id, dispatch, planetName])

  useEffect(() => {
    if (!residents && planet?.residents?.length) {
      setMessage('')
      dispatch(fetchList(planet))
    } else if (!planet) {
      dispatch(fetchPlanet(match.params.id))
    } else {
      setMessage(`This planet doesn't have residents`)
    }
  }, [dispatch, planet, match.params.id, match, residents, residentsList])

  const handleGoBack = useCallback(async () => {
    dispatch(selectPlanet(''))
    await history.push(`/`)
  }, [history, dispatch])

  const mappedResidents = useMemo(() => {
    return residentsList?.map((item) => (
      <Grid item xs={5} key={item.name}>
        <Card
          data={item}
          key={item.name}
          name={item.name}
          actionText={'SEE DETAIL'}
          onClick={() => console.log('click')}
        />
      </Grid>
    ))
  }, [residentsList])

  return mappedResidents.length ? (
    <Grid container justify='space-evenly' alignItems='center'>
      {mappedResidents}
    </Grid>
  ) : (
    <div>{message ? message : 'Loading...'}</div>
  )
}

export default ResidentList
