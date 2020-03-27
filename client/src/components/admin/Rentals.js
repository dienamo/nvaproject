import React from 'react'
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import './Rentals.scss'

class Rentals extends React.Component{
  state={
    listOfReservations: [],
    filteredList:[],
    search: ''
  }

  getAllReservations=()=>{
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/rentals`)
    .then(responseFromApi=>{
        this.setState({
            listOfReservations : responseFromApi.data,
            filteredList: responseFromApi.data
        })
    })
    .catch(err=>{
        console.log('Error',err)
    })
  }

  handleValidation=(rentalId)=>{
    // 
    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/rentals/${rentalId}`)
    .then(response=>{
      const updatedRental = response.data.updatedRental
      const listOfReservations2 = [...this.state.filteredList.map(reservation=>{
        return reservation._id === updatedRental._id ? updatedRental : reservation
      })];
      this.setState({
        filteredList : listOfReservations2
      })
      this.props.handleNotifications()
    })
  }
  
  handleCancellation=(rentalId)=>{
    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/cancelrental/${rentalId}`)
    .then(response=>{
      const updatedRental = response.data.updatedRental
      const listOfReservations2 = [...this.state.filteredList.map(reservation=>{
        return reservation._id === updatedRental._id ? updatedRental : reservation
      })];
      this.setState({
        filteredList : listOfReservations2
      })
      this.props.handleNotifications()
    })
  }

  handleTermination=(rentalId)=>{
    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/terminaterental/${rentalId}`)
    .then(response=>{
      const updatedRental = response.data.updatedRental
      const listOfReservations2 = [...this.state.filteredList.map(reservation=>{
        return reservation._id === updatedRental._id ? updatedRental : reservation
      })];
      this.setState({
        filteredList : listOfReservations2
      })
      this.props.handleNotifications()
    })
  }

  searchSpace=(event)=>{
    let keyword = event.target.value;
    const copyList = [...this.state.listOfReservations]
    const filteredList = copyList.filter(theReservation => {
      console.log(theReservation)
      return theReservation.user.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || theReservation.user.lastname.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      || theReservation.car.brand.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || theReservation.car.model.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      || theReservation.user.username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      ;
    })
    this.setState({
        filteredList,
        search:keyword,
    })
}
  
  
  componentDidMount(){
    this.getAllReservations()
}

  render(){
    return(
      <div>
        <div className='search-bar'>
        <FormControl fullWidth className='margin' variant="filled">
          <InputLabel htmlFor="outlined-adornment-amount">Rechercher une réservation</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={this.state.search}
            onChange={this.searchSpace}
            labelWidth={60}
          />
        </FormControl>
        </div>
        {this.state.filteredList.map(reservation=>{
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
                  {reservation.driverFees ? <ListItemText primary={'Frais de chauffeur:'} secondary={`${reservation.driverFees}`}/> : ''}
                </div>
                <div className='status'>
                  <ListItemText primary={'Statut:'} secondary={`${reservation.orderStatus}`} />
                </div>
                {reservation.orderStatus === 'Annulée' ? <div className='buttons'>Annulée</div> : <div className='buttons'>
                    {reservation.orderStatus === 'À traiter' ? <Button variant="contained" size='small' color="primary" className='main-button' onClick={(e)=>{this.handleValidation(reservation._id)}}>Véhicule prêt, envoyer la notification</Button> 
                    : 'Notification envoyée'}
                  <p>
                  <p>
                    {reservation.orderStatus === 'En cours'  || reservation.orderStatus === 'Lu' ? <Button variant='contained' size='small' onClick={(e)=>{this.handleTermination(reservation._id)}}>Retour véhicule, Terminer</Button> : ''}
                  </p>
                    {reservation.orderStatus === 'Terminée' ? 'Terminée' : <Button variant="contained" size='small' color="secondary" onClick={(e)=>{this.handleCancellation(reservation._id)}}>Annuler</Button> } 
                  </p> 
                  
                </div>}
                
            </List>
            <Divider />
          </div>
        })}
      </div>
    )
  }
}

export default Rentals