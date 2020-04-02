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
import logo from '../../images/black-logo-nva.png'
import Paper from '@material-ui/core/Paper';


class NavBar extends React.Component{

  state={
    open: false,
    anchorEl: undefined,
    showMenu: false
  }

  service = new AuthService()
  logoutUser = () => {
    this.service.logout()
    .then(() => {
      this.props.getUser(null);  
    })
  }

  handleClose=(e)=>{
    if (!this.dropdownMenu.contains(e.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.handleClose);
      });
    }
  }

  handleOpen=(e)=>{
    e.preventDefault()
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.handleClose);
    });
  }
  

  render(){
    if(this.props.userInSession){
      return(
        <div className='NavBar'>
      <AppBar position="sticky">
        <Toolbar>
          <div className="tool-bar">
          <Typography variant="h6">
            <Link to={'/'} style={{ textDecoration: 'none' }}><img src={logo} alt='' className='logo'/></Link>
          </Typography>
          <Media query="(max-width: 768px)">
          {matches =>
            matches ? (
              <div className='user-in-session'>
                <p id='user-name'>{this.props.userInSession.name}</p>
                <Notifications userInSession={this.props.userInSession}/>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e)=>this.handleOpen(e)}>
                  <MenuIcon />
                </Button>
                {this.state.showMenu ?
                <div className="menu-in-session" ref={(element) => {
                  this.dropdownMenu = element;
                }}>
                <Paper>
                <p><Link to={'/moncompte'} style={{ textDecoration: 'none' }}>Mon compte</Link></p>
                <p><button onClick={() => this.logoutUser()} style={{ textDecoration: 'none' }}>Deconnexion</button></p>
                </Paper>
                </div> : null} 
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
      <AppBar position="sticky" top='0px'>
        <Toolbar>
          <div className="tool-bar">
          <Typography variant="h6">
            <Link to={'/'} style={{ textDecoration: 'none' }}><img src={logo} alt='' className='logo'/></Link>
          </Typography>
          <Media query="(max-width: 768px)">
          {matches =>
            matches ? (
              <div className='nav-burger'>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e)=>this.handleOpen(e)}>
                  <MenuIcon />
                </Button>
                {this.state.showMenu ?
                <div className="menu" ref={(element) => {
                  this.dropdownMenu = element;
                }}>
                <Paper>
                <p><Link to={'/login'} style={{ textDecoration: 'none' }}>Connexion</Link></p>
                <p><Link to={'/signup'} style={{ textDecoration: 'none' }}>Inscription</Link></p>
                </Paper>
                </div> : null}       
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