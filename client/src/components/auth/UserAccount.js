import React from 'react'
import AuthService from './auth-service';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import './UserAccount.scss'
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import moment from 'moment';
moment.locale('fr');

class UserAccount extends React.Component{
  constructor(props){
    super(props)
    this.state={
      address: '',
      phonenumber:'',
      user:{
        rentals:[]
      },
      openAddress: false,
      openPhonenumber: false
    }
    this.service = new AuthService();
  }

  handleAddressFormSubmit = (event) => {
    event.preventDefault();
    
    const {address} = this.state

    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/user/${this.state.user._id}`, {address})
      .then((response) => {
        console.log(response)
          // this.props.getData();
          // Reset form
          // this.setState({
              //   brand: "",model: "",type: "",numberOfSeats: "",numberOfDoors: "",transmission:"",airConditionner:"",
              //   mainImgUrl:"",agency: "",feesPerDay: "",numberPlate: ""
              // });
            })
            .catch(error => console.log(error))
  }

  handlePhonenumberFormSubmit = (event) => {
    event.preventDefault();
    
    const {phonenumber} = this.state

    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/user/${this.state.user._id}`, {phonenumber})
      .then((response) => {
        console.log(response)
          // this.props.getData();
          // Reset form
          // this.setState({
              //   brand: "",model: "",type: "",numberOfSeats: "",numberOfDoors: "",transmission:"",airConditionner:"",
              //   mainImgUrl:"",agency: "",feesPerDay: "",numberPlate: ""
              // });
            })
            .catch(error => console.log(error))
  }

  fetchUserInfo = (id) => {
    this.service.userAccount(id)
      .then((response) => {
        this.setState({
          user : response
        })
      })

  }

  
  handleOpenAddress=()=>{
    this.setState({
        openAddress: true,
    })
  }

  handleOpenPhonenumber=()=>{
    this.setState({
        openPhonenumber: true,
    })
  }

  handleCloseAddress=()=>{
    this.setState({
      openAddress: false
    })
  }

  handleClosePhonenumber=()=>{
    this.setState({
      openPhonenumber: false
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}

  componentDidMount(){
    if (this.props.userInSession) {
      this.fetchUserInfo(this.props.userInSession._id);
    }
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userInSession !== this.props.userInSession) {
      // AJAX vient d3 revenir avec le user
      this.fetchUserInfo(this.props.userInSession._id);
    }
  }

  render(){
    const user = this.state.user

    if (!this.props.userInSession) return "Chargement..."

    return(
      <div>
      <h2 style={{padding: '40px'}}>Mon profil</h2>
      <div className='main-container'>
       <div className='profil'>
         <Paper>
          <h3 style={{textAlign: 'center'}}>Mon compte</h3>
          <h4>{user.name} {user.lastname}</h4>
          <p>Membre depuis le : {moment(user.created_at).locale('fr').format('LLL')}</p>
          <p>Adresse courriel : {user.username}</p>
          <div className='update-button'>
          <p>Adresse : {user.address}</p>
          <Button onClick={()=>this.handleOpenAddress(user._id)} variant="contained" style={{backgroundColor: 'mediumaquamarine', color:'white', height:'25px' ,width:'100px', padding: '0px' ,textTransform: 'none'}}>
              Mettre à jour
          </Button>
          </div>
          <div className='update-button'>
          <p>Numéro de téléphone : {user.phonenumber}</p>
          <Button onClick={()=>this.handleOpenPhonenumber(user._id)} variant="contained" style={{backgroundColor: 'mediumaquamarine', color:'white', height:'25px' ,width:'100px', padding: '0px', textTransform: 'none'}}>
              Mettre à jour
          </Button>
          </div>
          </Paper>
          <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openAddress}
          onClose={this.handleCloseAddress}
          >
          <div className='confirmation-modal'>
              <h2 id="simple-modal-title">Nouvelle adresse</h2>
              <form onSubmit={this.handleAddressFormSubmit}>
                  <TextField id="outlined-basic" name="address" value={this.state.available}label="Adresse" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
                  <input type="submit" value="submit"/>
              </form>
              <p id="simple-modal-description"></p>                         
          </div>
          </Modal>
          <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openPhonenumber}
          onClose={this.handleClosePhonenumber}
          >
          <div className='confirmation-modal'>
              <h2 id="simple-modal-title">Nouveau numéro de téléphone</h2>
              <form onSubmit={this.handlePhonenumberFormSubmit}>
                  <TextField id="outlined-basic" name="phonenumber" value={this.state.agency}label="N° de téléphone" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
                  <input type="submit" value="submit"/>
              </form>
              <p id="simple-modal-description"></p>                         
          </div>
          </Modal>
          
        </div>
        <div className='rentals-list'>
        <Paper>
       <h3 style={{textAlign: 'center'}}>Mes reservations</h3>
       {this.state.user.rentals.map(rental=>{
         return(
         <div key={rental._id} className='list-items'>
           <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={rental.car.imageUrl}/>
        </ListItemAvatar>
        <ListItemText
          primary={`${rental.car.brand} ${rental.car.model} ${rental.car.year}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className=''
                color="textPrimary"
              >
                Statut: {rental.orderStatus === 'Lu' ? "Véhicule prêt à être récupéré à l'agence": rental.orderStatus}
              </Typography><br/>
              Du {rental.dateOut} au {rental.dateOfReturn}
            </React.Fragment>
          }
        />
      </ListItem>
          </div>
         )
       })}
       </Paper>
      </div>
      </div>
      </div>
    )
  }
}

export default UserAccount