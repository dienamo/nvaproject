import React from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Modal from '@material-ui/core/Modal';
import AuthService from '../auth/auth-service';

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
          console.log(response)
          const notifNumber = response.filter(rental=> rental.orderStatus === 'En cours').length
          const notificationContent = response.filter(rental=> rental.orderStatus === 'En cours')
          this.setState({
              notification : notifNumber,
              notificationContent : notificationContent
            })
            console.log(this.state.notificationContent)
      })
    }

    handleOpen=()=>{
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
            <div className='confirmation-modal'>
                <h2 id="simple-modal-title">Details de votre réservation</h2>
                <p id="simple-modal-description"></p>
                {this.state.notificationContent.map(notification=>{
                    return(
                        <div>
                            {notification._id}
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
