import React from 'react'
import axios from 'axios'
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import './Clients.scss'

class Clients extends React.Component{

  state = {
    listOfClients: [],
    search: ''
  }

  getAllClients=()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/users`)
    .then(responseFromApi=>{
        this.setState({
            listOfClients : responseFromApi.data
        })
    })
    .catch(err=>{
        console.log('Error',err)
    })
  }

  componentDidMount(){
    this.getAllClients()
  }

  render(){
    console.log(this.state.listOfClients)
    console.log(this.state.listOfClients[0])
    return(
      <div>
        <div className='search-bar'>
        <FormControl fullWidth className='margin' variant="filled">
          <InputLabel htmlFor="outlined-adornment-amount">Rechercher un client</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value=''
            onChange=''
            labelWidth={60}
          />
        </FormControl>
        </div>
        {this.state.listOfClients.map(client=>{
          return(
            <div key={client._id}>
              <List component="nav" aria-label="secondary mailbox folders" className='main-list-container'>
                <div className='main-infos'>
                    <ListItemText primary="Nom: " secondary={client.lastname}/>
                    <ListItemText primary="Prenom:" secondary={client.name} />
                    <ListItemText primary="Identifiant:" secondary={client.username} />
                  </div>
                  <div className='other-infos'>
                    <ListItemText primary={'Inscrit le'} secondary={`${client.created_at}`} />
                    <ListItemText primary={'Adresse:'} secondary={`${client.address}`}/>
                    <ListItemText primary={'N° de téléphone:'} secondary={`${client.phonenumber}`}/>
                </div>
                  <div className='last-rental'>
                    <ListItemText primary={'Dernière réservation:'} secondary={`Statut: ${client.rentals.orderStatus}`}/>
                  </div>
             </List>
             <Divider />
            </div>
          )
        })}
      </div>
    )
  }
}

export default Clients