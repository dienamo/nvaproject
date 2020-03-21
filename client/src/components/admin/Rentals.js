import React from 'react'
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import './Rentals.scss'

class Rentals extends React.Component{
  state={
    listOfReservations: [],
    buttonValue: 'Véhicule prêt, envoyer la notification'
  }

  getAllReservations=()=>{
    axios.get('http://localhost:5000/api/rentals')
    .then(responseFromApi=>{
        this.setState({
            listOfReservations : responseFromApi.data
        })
    })
    .catch(err=>{
        console.log('Error',err)
    })
  }

  handleValidation=(rentalId)=>{
    // 
    axios.put(`http://localhost:5000/api/rentals/${rentalId}`)
    .then(response=>{
      const updatedRental = response.data.updatedRental
      const listOfReservations2 = [...this.state.listOfReservations.map(reservation=>{
        return reservation._id === updatedRental._id ? updatedRental : reservation
      })];
      this.setState({
        listOfReservations : listOfReservations2
      })
      this.props.handleNotifications()
    })
  }
  
  
  componentDidMount(){
    this.getAllReservations()
}


  render(){
    return(
      <div>
        {this.state.listOfReservations.map(reservation=>{
          return <div key={reservation._id}>
            <List component="nav" aria-label="secondary mailbox folders" className='main-list-container'>
                <div className='main-infos'>
                  <ListItemText primary={`${reservation.agency.name}`} />
                  <ListItemText primary={`${reservation.car.brand} ${reservation.car.model} ${reservation.car.year}`} secondary={` ref: ${reservation.car._id}`} />
                  <ListItemText primary={'Client:'} secondary={`${reservation.user.name} ${reservation.user.lastname}`}/>
                  <ListItemText secondary={`Tel: ${reservation.user.phonenumber}`}/>
                </div>
                <div className='other-infos'>
                  <ListItemText primary={'Prise en charge:'} secondary={`${reservation.dateOut}`} />
                  <ListItemText primary={'Retour:'} secondary={`${reservation.dateOfReturn}`}/>
                </div>
                <div className='status'>
                  <ListItemText primary={'Statut:'} secondary={`${reservation.orderStatus}`} />
                </div>
                <div className='buttons'>
                  <Button variant="contained" size='small' color="primary" className='main-button' onClick={(e)=>{this.handleValidation(reservation._id)}}>
                    {reservation.orderStatus === 'À traiter' ? 'Véhicule prêt, envoyer la notification' : 'Notification envoyée'}
                  </Button>
                  <Button variant="contained" color="secondary">
                    Annuler
                  </Button>                 
                </div>
            </List>
            <Divider />
          </div>
        })}
      </div>
    )
  }
}

export default Rentals