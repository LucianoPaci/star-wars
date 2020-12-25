import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchResident,
  selectResident,
  selectPlanet,
} from '../state/residentsDucks'

function Resident({ match }) {
    console.log("ACA")
  const { resident } = useSelector((state) => state.residents)
  console.log('Resident ~ resident', resident)

  const dispatch = useDispatch()

  useEffect(() => {
    // Cleanup. Remove resident and planet when unmounting
    return () => {
      dispatch(selectResident(''))
      dispatch(selectPlanet())
    }
  }, [])

  useEffect(() => {
    if (!resident) {
      dispatch(fetchResident(match.params.id))
    }
  }, [dispatch,match, match.params.id, resident])

  const renderResident = useMemo(() => {
    return resident && <div>{JSON.stringify(resident)}</div>
  }, [resident])

  return renderResident
}

export default Resident
