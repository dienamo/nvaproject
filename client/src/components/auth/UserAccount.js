import React from 'react'
import AuthService from './auth-service';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import './UserAccount.scss'

class UserAccount extends React.Component{
  constructor(props){
    super(props)
    this.state={
      user:{
        rentals:[]
      }
    }
    this.service = new AuthService();
  }

  fetchUserInfo = (id) => {
    this.service.userAccount(id)
      .then((response) => {
        this.setState({
          user : response
        })
      })

  }

  componentDidMount(){
    this.fetchUserInfo(this.props.userInSession._id);
  }

  render(){

    const user = this.props.userInSession
    console.log(user)
    return(
      <div>
      <h5>Mon profil</h5>
      <div className='main-container'>
      <div className='rentals-list'>
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
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
          </div>
         )
       })}
      </div>
       <div className='profil'>
        <h4>Mon compte</h4>
          <h5>{user.name}</h5>
          <p>Membre depuis le : {user.created_at}</p>
          <p>Adresse courriel : {user.username}</p>
          <p>Adresse : </p>
          <p>Numéro de téléphone : {user.phonenumber}</p>
        </div>
      </div>
      </div>
    )
  }
}

export default UserAccount