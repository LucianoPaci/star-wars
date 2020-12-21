// If you want to access a resource in particular from SWAPI, you should keep in mind that the ID used as a parameter for the URL does not exist.
// We must create that association and use `name` as an ID

export default function adapt(data) {
  const adapted = {}
  data.forEach((d) => {
    adapted[d.name] = { ...d }
  })
  return adapted
}
