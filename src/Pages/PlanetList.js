import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchList } from '../state/planetsDucks'


function PlanetList() {

    // const [list, setList] = useState([])

    // useEffect(() => {
        
        
        
    // }, [])
    
    const dispatch = useDispatch()

    const list = useSelector(store => store.planets.planetsList)
    // console.log('🚀 ~ file: planetList.js ~ line 19 ~ PlanetList ~ list', list)



    return (
        <div>
            Planet List
            <button onClick={() => dispatch(fetchList())}>
                Call Api
            </button>
            <ul>
            {list.map(item => (
                <li key={item.name}>
                    {item.name}
                </li>
            ))}

            </ul>
        </div>
    )
}

export default PlanetList
