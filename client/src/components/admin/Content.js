import React from 'react';
//import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
//import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import CarList from '../cars/CarList'
import Modal from '@material-ui/core/Modal';
import './Content.scss'
import AddCar from '../cars/AddCar'

class Content extends React.Component {

  state={
    open: false
  }

  handleOpen=()=>{
    this.setState({
        open: true
    })
  }

  handleClose=()=>{
    this.setState({
        open: false
    })
  }

  render(){
  return (
    <div className='admin-console'>
    <Paper className='paper'>
      <AppBar className='searchBar' position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className='block 'color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  className: 'searchInput',
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" className='addUser' onClick={this.handleOpen}>
                Ajouter un véhicule
              </Button>
              <Modal
                className='modal-style'
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
              >
        <div className='paper'>
            <AddCar />
        </div>
      </Modal>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon className='block' color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className='contentWrapper'>
      </div>
    </Paper>
    <div className='car-list'>
      <CarList />
    </div>
    </div>
    
  );
}
}


export default Content;