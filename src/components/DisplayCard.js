import React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}))

const mapper = (content) => (
  Object.keys(content).map(key => ({ key, value: content[key]} ))
)

function DisplayCard({ title, content }) {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          <ul>
            {mapper(content).map(element => (
              <li key={element.key}>
                {element.key}: {element.value}
            </li>
            ))}
          </ul>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default DisplayCard
