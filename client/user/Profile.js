import React, { Component } from 'react'
import auth from '../auth/auth-helper'
import {read} from './api-user'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Redirect} from 'react-router-dom'
import Person from '@material-ui/icons/Person'
import Edit from '@material-ui/icons/Edit'
import DeleteUser from './DeleteUser'
import {List, ListItem, ListItemAvatar, Avatar, ListItemText , Divider, Paper, Typography, ListItemSecondaryAction, Link, IconButton} from '@material-ui/core'
const styles = theme => ({
    root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 5
    }),
    title: {
      margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px 0`,
      color: theme.palette.protectedTitle,
      fontSize: '1em'
    },
    bigAvatar: {
      width: 60,
      height: 60,
      margin: 10
    }
  })
class Profile extends Component {
    constructor({match}){
        super()
        this.state = {
            user:'',
            redirectToSigin:false  
        }
        this.match = match
    }

    init = userId => {
        const jwt = auth.isAuthenticated()
        read({
            userId:userId
        }, {t:jwt.token}).then(data=>{
            console.log('data', jwt)
            if(data.error)
                this.setState({redirectToSigin:true})
            else
                return this.setState({user:data})
        })
    }

    componentDidMount(){
        this.init(this.match.params.userId)
    }

    componentWillReceiveProps(){
        this.init(this.match.params.userId)
    }

   
  render() {
    const {classes} = this.props
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin)
      return <Redirect to='/signin'/>
    return (
        <div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="title" className={classes.title}> Profile </Typography>
            <List dense>
              <ListItem>
                <ListItemAvatar>
                   <Avatar>
                     <Person/>
                   </Avatar>
                </ListItemAvatar>
                <ListItemText primary={this.state.user.name} 
                             secondary={this.state.user.email}/>

{
             auth.isAuthenticated().user && auth.isAuthenticated().user._id == this.state.user._id
             ? (<ListItemSecondaryAction>
                  <Link to={"/user/edit/" + this.state.user._id}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit/>
                    </IconButton>
                  </Link>
                  <DeleteUser userId={this.state.user._id}/>
                </ListItemSecondaryAction>)
            :''
            }         
              </ListItem>
              <Divider/>
              <ListItem>
                <ListItemText primary={"Joined: " + 
                    (new Date(this.state.user.created)).toDateString()}/>
              </ListItem>
            </List>
        </Paper>
      </div>
    )
  }
}
Profile.propTypes = {
    classes: PropTypes.object.isRequired
  }
  
  export default withStyles(styles)(Profile)