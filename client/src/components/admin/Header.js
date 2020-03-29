import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import SimpleTabs from './SimpleTabs'
import Badge from '@material-ui/core/Badge';
import axios from 'axios'
import './Header.scss'

class Header extends React.Component {

  state={
    notification: 0,
  }
  
handleNotifications=()=>{
  axios.get(`${process.env.REACT_APP_APIURL || ""}/api/todonumber`)
   .then(todonumber=>{
     this.setState({
       notification: todonumber.data
     })
   })
}

componentDidMount(){
  this.handleNotifications()
}

  render(){
  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0} className='header' style={{backgroundColor:'darkslategrey'}}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.onDrawerToggle}
                  className='menuButton'
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                <Badge badgeContent={this.state.notification} color="secondary">
                  <NotificationsIcon />
                </Badge>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className='secondaryBar'
        color="primary"
        position="static"
        elevation={0}
        style={{backgroundColor:'darkslategrey'}}
      >
        <Toolbar style={{backgroundColor:'darkslategrey'}}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Administration
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className='secondaryBar'
        color="primary"
        position="static"
        elevation={0}
        style={{backgroundColor:'darkslategrey'}}
      >
      </AppBar>
      <SimpleTabs handleNotifications={this.handleNotifications} />
    </React.Fragment>
  );
}
}

export default Header;

