import React, { Component } from 'react'
import { list } from './api-user'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Paper, Typography, List, ListItem, ListItemAvatar, ListItemSecondaryAction, IconButton, ListItemText, Avatar} from '@material-ui/core'
import Person from '@material-ui/icons/Person'
import ArrowForward from '@material-ui/icons/ArrowForward'
import {Link} from 'react-router-dom'

const styles = theme => ({
    root: theme.mixins.gutters({
      padding: theme.spacing.unit,
      margin: theme.spacing.unit * 5
    }),
    title: {
      margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.openTitle
    }
  })
class Users extends Component {

    state = {
        users:[]
    }

    componentDidMount(){
        list().then(data=>{
            if(data.error)
                console.log(data.error)
            else
                this.setState({users:data})
        })
    }

  render() {
    const {classes} = this.props
    return (
        <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Users
        </Typography>
        <List dense>
          {this.state.users.map(function(item, i) {
              return <Link to={"/user/" + item._id} key={i}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <Person/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name}/>
                  <ListItemSecondaryAction>
                    <IconButton>
                      <ArrowForward/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            })}
        </List>
      </Paper>
    )
  }
}
Users.propTypes = {
    classes: PropTypes.object.isRequired
  }
  
  export default withStyles(styles)(Users)