import React from 'react'
import Card from '@material-ui/core/Card'
import { CardContent, CardHeader } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1)
  },
}))

function DisplayCard({ title, content }) {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardHeader>{title}</CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}

export default DisplayCard
