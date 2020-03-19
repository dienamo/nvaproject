import React from 'react'
import AuthService from './auth-service';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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
    console.log('@@@@@@@@@@@@@@@@@',this.state.user.rentals)
    return(
      <div>
       {/* <h4>{this.props.userInSession.name}</h4> */}
       <h5>Mon profil</h5>
       {this.state.user.rentals.map(rental=>{
         return(
         <div key={rental._id}>
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
    )
  }
}

export default UserAccount