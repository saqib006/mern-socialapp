import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Card, CardContent, CardMedia, Typography} from '@material-ui/core'
import SeaShell from '../assets/images/seashell.jpg'
import {Link} from 'react-router-dom'

const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing.unit * 5
      },
      title: {
        padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px 
        ${theme.spacing.unit * 2}px`,
        color: theme.palette.text.secondary
      },
      media: {
        minHeight: 330
      }
})


class Home extends Component {
  render() {
      const {classes} = this.props
    return (
      <div>
  
        <Card className={classes.card}>
            <Typography variant="body1" component="p">
                HomePage
            </Typography>
            <CardMedia className={classes.media} image={SeaShell} title="Unicord Shells" />
            <CardContent>
                <Typography variant="body1" component="p">
                Welcome To Social app
                <Link to="/users">Users</Link>
                <Link to="/signup">signup</Link>
                <Link to="/signin">signin</Link>
                </Typography>
            </CardContent>
        </Card>
      </div>
    )
  }
}


Home.propTypes = {
    classes:PropTypes.object.isRequired
}

export default withStyles(styles)(Home)