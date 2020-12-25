import PlanetList from '../Pages/PlanetList'
import ResidentList from '../Pages/ResidentList'
import Resident from '../Pages/Resident'


const routes = [
  {
    path: '/',
    component: PlanetList,
    exact: true,
  },
  {
    path: "/planets/:id",
    component: ResidentList,
    exact: true,
  },
  {
    path: "/residents/:id",
    component: Resident,
    exact: true,
  }
]

export default routes
