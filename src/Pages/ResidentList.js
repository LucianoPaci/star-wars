import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchList, fetchPlanet, selectPlanet } from '../state/residentsDucks'

function ResidentList({ match }) {
const { loading, error, residentsList, planetName, planet } = useSelector(
    (store) => store.residents
    )
    const dispatch = useDispatch()
    
    // fetch planet from params
    useEffect(() => {
        if(!planetName || planetName !== match.params.id) {
            dispatch(selectPlanet(match.params.id))
        }
    }, [match.params.id, dispatch, planetName ])
    

    useEffect(() => {
        if(planetName) {
            dispatch(fetchPlanet(planetName))
        }
    }, [planetName, dispatch])


  return (
  <div>
     {planet ? (<p>{JSON.stringify(planet, null, 2)}</p>) : <p>Loading</p>}
      </div>
      )
}

export default ResidentList
