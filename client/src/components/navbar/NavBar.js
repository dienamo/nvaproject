import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './NavBar.scss'

class NavBar extends React.Component{
  service = new AuthService()
  logoutUser = () => {
    this.service.logout()
    .then(() => {
      this.props.getUser(null);  
    })
  }
  render(){

    if(this.props.userInSession){
      return(
        <div className='NavBar'>
      <AppBar position="sticky">
        <Toolbar>
          <div className="tool-bar">
          <Typography variant="h6">
            <Link to={'/'} style={{ textDecoration: 'none' }}>NVA</Link>
          </Typography>
          <div className='user-in-session'>
              {this.props.userInSession.name}
            <Link to={'/moncompte'} style={{ textDecoration: 'none' }}><AccountBoxIcon /></Link>
            <ExitToAppIcon onClick={() => this.logoutUser()}/>
          </div>
          </div>
        </Toolbar>
      </AppBar>
      
    </div>
      )
    }
    return(
      <div className='NavBar'>
      <AppBar position="sticky">
        <Toolbar>
          <div className="tool-bar">
          <Typography variant="h6">
            <Link to={'/'} style={{ textDecoration: 'none' }}>NVA</Link>
          </Typography>
          <div className='nav-button'>
          <Link to={'/login'} style={{ textDecoration: 'none' }}><Button color="inherit" variant="outlined">Connexion</Button></Link>
          <Link to={'/signup'} style={{ textDecoration: 'none' }}><Button color="inherit" variant="outlined">Inscription</Button></Link>
          </div>
          </div>
        </Toolbar>
      </AppBar>
      
    </div>
    )
  }
}

export default NavBar