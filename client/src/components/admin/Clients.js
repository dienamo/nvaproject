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
    filteredList:[],
    search: ''
  }

  getAllClients=()=>{
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/users`)
    .then(responseFromApi=>{
        this.setState({
            listOfClients : responseFromApi.data,
            filteredList: responseFromApi.data
        })
    })
    .catch(err=>{
        console.log('Error',err)
    })
  }

  searchSpace=(event)=>{
    let keyword = event.target.value;
    const copyList = [...this.state.listOfClients]
    const filteredList = copyList.filter(theClient => {
      return theClient.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || theClient.lastname.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      || theClient.username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      ;
    })
    this.setState({
        filteredList,
        search:keyword,
    })
}

  componentDidMount(){
    this.getAllClients()
  }

  render(){
    return(
      <div>
        <div className='search-bar'>
        <FormControl fullWidth className='margin' variant="filled">
          <InputLabel htmlFor="outlined-adornment-amount">Rechercher un client</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={this.state.search}
            onChange={this.searchSpace}
            labelWidth={60}
          />
        </FormControl>
        </div>
        {this.state.filteredList.map(client=>{
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