import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Card from '../components/Card'
import Grid from '@material-ui/core/Grid'

import { fetchList } from '../state/planetsDucks'

function PlanetList() {
  // const [list, setList] = useState([])

  useEffect(() => {
    dispatch(fetchList())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useDispatch()

  const list = useSelector((store) => store.planets.planetsList)
  const loading = useSelector((store) => store.planets.loading)

  return (
    <div>
      Planet List
      <div>{loading ? 'Loading' : null}</div>
      <Grid container>
        {list.map((item) => (
          <Grid item xs={4} key={item.name}>
            <Card data={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default PlanetList
