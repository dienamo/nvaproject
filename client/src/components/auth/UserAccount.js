import React from 'react'

class UserAccount extends React.Component{
  render(){
    console.log(this.props.userInSession)
    return(
      <div>
       <h4>{this.props.userInSession.name}</h4>
       <h5>Mes reservations</h5>
       {this.props.userInSession.rentals.map(rental=>{
         return(
         <div>{rental.car}</div>
         )
       })}
      </div>
    )
  }
}

export default UserAccount