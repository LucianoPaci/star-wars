import React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    overflowX: 'auto',
  },
}))

const mapper = (content) =>
  Object.keys(content).map((key) => ({ key, value: content[key] }))

function DisplayCard({ title, content }) {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardHeader title={title} />
      {content && (
        <CardContent>
          <ul>
            <Typography variant='body2' color='textSecondary' component='p'>
              {mapper(content).map((element) => (
                <li key={element.key}>
                  {element.key}: {element.value}
                </li>
              ))}
            </Typography>
          </ul>
        </CardContent>
      )}
    </Card>
  )
}

export default DisplayCard
