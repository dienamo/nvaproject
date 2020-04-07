import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Modal from '@material-ui/core/Modal';
import AuthService from '../auth/auth-service';
import './NavBar.scss'

class Notifications extends React.Component{

    state={
      notification: 0,
      notificationContent: [],
      open: false
    }

    service = new AuthService();
    
    handleReadyOrders=(id)=>{
      this.service.isreadynumber(id)
      .then(response=>{
          const notifNumber = response.filter(rental=> rental.orderStatus === 'En cours').length
          const notificationContent = response.filter(rental=> rental.orderStatus === 'En cours')
          this.setState({
              notification : notifNumber,
              notificationContent : notificationContent
            })
      })
    }

    handleOpen=()=>{
        const notificationIds = this.state.notificationContent.map(rental=>{
            return rental._id
        })
        this.service.readbyuser(notificationIds)
        .then(response=>console.log(response))
        this.setState({
            open: true,
            notification: 0
        })
      }

      handleClose=()=>{
        this.setState({
            open: false
        })
      }

    displayContent=()=>{
        console.log(this.state.notificationContent)
    }
    
    componentDidMount(){
     this.handleReadyOrders(this.props.userInSession._id)
    }

    render(){
        console.log(this.state.notificationContent)
        const notification = this.state.notificationContent
        return(
            <div>
            <Badge badgeContent={this.state.notification} color="secondary" onClick={this.handleOpen}>
                <NotificationsIcon />
            </Badge>
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            >
            <div className='notification-modal'>
                <h3 id="simple-modal-title">{this.state.notificationContent.length > 0 ? '' : "Aucune notification, veuillez consulter votre compte"}</h3>
                <p id="simple-modal-description"></p>
                {notification.map(notification=>{
                    console.log(notification)
                    return(
                        <div>
                            <h3>Le véhicule {notification.car.brand} {notification.car.model} {notification.car.year} est prêt à être récupéré à l'agence:</h3> 
                            <h3>{notification.car.agency.name}.</h3>
                            <h3>Merci d'avoir choisi NVA.</h3>
                        </div>
                    )
                })}
            </div>
        </Modal>
        </div>
        )
    }
}

export default Notifications
