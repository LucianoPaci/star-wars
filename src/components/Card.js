import { CardContent, CardHeader, Button, CardActions } from '@material-ui/core'
import Card from '@material-ui/core/Card'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}))

function CustomCard({ data }) {
  const classes = useStyles()

  return (
    <Card variant='outlined' className={classes.root}>
      <CardHeader title={data.name} />
      <CardContent>{data.name}</CardContent>
      <CardActions>
          <Button>Residents</Button>
      </CardActions>
    </Card>
  )
}
export default CustomCard
