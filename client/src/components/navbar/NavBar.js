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
import Notifications from './Notifications';
import Media from 'react-media';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class NavBar extends React.Component{

  state={
    open: false,
    anchorEl: undefined
  }

  service = new AuthService()
  logoutUser = () => {
    this.service.logout()
    .then(() => {
      this.props.getUser(null);  
    })
  }

  handleClose=()=>{
    this.setState({
      open: false
    })
  }

  handleOpen=()=>{
    this.setState({
      open: true
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
          <Media query="(max-width: 599px)">
          {matches =>
            matches ? (
              <div className='user-in-session'>
                <p id='user-name'>{this.props.userInSession.name}</p>
                <Notifications userInSession={this.props.userInSession}/>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleOpen}>
                  <MenuIcon />
                </Button>
                <div className="simple-menu">
                <Menu
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                  anchorEl={this.state.anchorEl}
                  getContentAnchorEl={null}
                  keepMounted
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <Link to={'/moncompte'} style={{ textDecoration: 'none' }}><MenuItem>Mon compte</MenuItem></Link>
                  <Link to={'/logout'} style={{ textDecoration: 'none' }}><MenuItem>Deconnexion</MenuItem></Link>
                </Menu>
                </div>
              </div>
            ) : (
              <div className='user-in-session'>
                {this.props.userInSession.name}
                <Link to={'/moncompte'} style={{ textDecoration: 'none' }}><AccountBoxIcon /></Link>
                <Notifications userInSession={this.props.userInSession}/>
                <ExitToAppIcon onClick={() => this.logoutUser()}/>
            </div>
            )
          }
          </Media>
          
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
          <Media query="(max-width: 768px)">
          {matches =>
            matches ? (
              <div className='nav-burger'>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleOpen}>
                  <MenuIcon />
                </Button>
                <div className="simple-menu">
                <Menu
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                  anchorEl={this.state.anchorEl}
                  getContentAnchorEl={null}
                  keepMounted
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <Link to={'/login'} style={{ textDecoration: 'none' }}><MenuItem>Connexion</MenuItem></Link>
                  <Link to={'/signup'} style={{ textDecoration: 'none' }}><MenuItem>Inscription</MenuItem></Link>
                </Menu>
                </div>
              </div>
            ) : (
              <div className='nav-button'>
                <Link to={'/login'} style={{ textDecoration: 'none' }}><Button className='connexion-button' color="inherit" variant="outlined">Connexion</Button></Link>
                <Link to={'/signup'} style={{ textDecoration: 'none' }}><Button color="inherit" variant="outlined">Inscription</Button></Link>
              </div>
            )
          }
        </Media>
          </div>
        </Toolbar>
      </AppBar>
      
    </div>
    )
  }
}

export default NavBar