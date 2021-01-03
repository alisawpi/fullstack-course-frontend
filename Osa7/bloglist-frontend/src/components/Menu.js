import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import PeopleIcon from '@material-ui/icons/People';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logoutUser } from '../reducers/userReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    position: 'sticky'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    margin: '5px 10px'
  },
  link: {
    color: '#FFFFFF'
  }
}));

const Menu = () => {
  const classes = useStyles()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  return (
    <AppBar className={classes.root}>
      <Typography varaint='h6' className={classes.title}><Button component={RouterLink} className={classes.link} to='/'>Blogs</Button></Typography>
      <Typography varaint='h6' className={classes.title}><Button startIcon={<AddIcon />} component={RouterLink} className={classes.link} to='/create'>create new</Button></Typography>
      <Typography varaint='h6' className={classes.title}><Button startIcon={<PeopleIcon />} component={RouterLink} className={classes.link} to='/users'>users</Button></Typography>
      {user ? 
       <Button className={classes.link} startIcon={<ExitToAppIcon/> } onClick={() => dispatch(logoutUser())}> Log out </Button>
      : null }
    </AppBar>
  )
}

export default Menu