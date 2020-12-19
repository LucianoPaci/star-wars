import React, { useCallback } from 'react'
import {
  CardContent,
  CardHeader,
  Button,
  CardActions,
  CardActionArea,
  Tooltip,
} from '@material-ui/core'
import Card from '@material-ui/core/Card'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}))

function CustomCard({ data, onClickCard, name, hint, content}) {
  const handleClickCard = useCallback(() => {
    onClickCard(name)
  }, [name, onClickCard])
  const classes = useStyles()

  return (
    <Card variant='outlined' className={classes.root}>
        <CardActionArea onClick={handleClickCard}>
          <CardHeader title={data.name} />
          <CardContent>{content}</CardContent>
        </CardActionArea>
    </Card>
  )
}
export default CustomCard
