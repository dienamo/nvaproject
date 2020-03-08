import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './NavBar.scss'

class NavBar extends React.Component{
  render(){
    return(
      <div className='NavBar'>
       
      <AppBar position="static">
        <Toolbar>
          <div className="tool-bar">
          <Typography variant="h6">
            <Link to={'/'}>NVA</Link>
          </Typography>
          <div className='nav-button'>
          <Button color="inherit" variant="outlined">Connexion</Button>
          <Button color="inherit" variant="outlined">Inscription</Button>
          </div>
          </div>
        </Toolbar>
      </AppBar>
      
    </div>
    )
  }
}

export default NavBar