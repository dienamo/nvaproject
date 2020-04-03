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

class UserAccount extends React.Component{
  constructor(props){
    super(props)
    this.state={
      user:{
        rentals:[]
      },
      open: false
    }
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    
    const {address,phonenumber} = this.state

    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/user/${this.state.user._id}`, {address, phonenumber})
      .then((response) => {
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

  handleOpen=(updatedUser)=>{
    this.setState({
        open: true,
        updatedUser: updatedUser
    })
  }

  handleClose=()=>{
    this.setState({
      open: false
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}

  componentDidMount(){
    this.fetchUserInfo(this.props.userInSession._id);
  }

  render(){
    const user = this.props.userInSession
    console.log(user)
    return(
      <div>
      <h3>Mon profil</h3>
      <div className='main-container'>
       <div className='profil'>
         <Paper>
          <h4>Mon compte</h4>
          <h5>{user.name} {user.lastname}</h5>
          <p>Membre depuis le : {user.created_at}</p>
          <p>Adresse courriel : {user.username}</p>
          <p>Adresse : {user.address}</p>
          <p>Numéro de téléphone : {user.phonenumber}</p>
          </Paper>
          <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          >
          <div className='confirmation-modal'>
              <h2 id="simple-modal-title">Mise à jour du profile</h2>
              <form onSubmit={this.handleFormSubmit} className="AddCar">
                  <TextField id="outlined-basic" name="address" value={this.state.available}label="Adresse" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
                  <TextField id="outlined-basic" name="phonenumber" value={this.state.agency}label="N° de téléphone" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
                  <input type="submit" value="submit"/>
              </form>
              <p id="simple-modal-description"></p>                         
          </div>
          </Modal>
          <Button onClick={()=>this.handleOpen(user._id)} variant="contained" style={{backgroundColor: 'slategrey', color:'white'}}>
              Mettre à jour mon profile
          </Button>
        </div>
        <div className='rentals-list'>
        <Paper>
       <h4>Mes reservations</h4>
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