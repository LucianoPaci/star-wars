import PlanetList from '../Pages/PlanetList'
import ResidentList from '../Pages/ResidentList'

const routes = [
  {
    path: '/',
    component: PlanetList,
    exact: true,
  },{
    path: "/planets/:id",
    component: ResidentList,
    exact: true,
  },

]

export default routes
