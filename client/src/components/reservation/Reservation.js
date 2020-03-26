import React from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';


class Confirmation extends React.Component{
  
  handleRental=()=>{
    let{agency,car,dateOut,dateOfReturn,rentalFees}= this.props.match.params
    axios.post(`${process.env.REACT_APP_API_URL || ""}/api/rentals`,{agency,car,dateOut,dateOfReturn,rentalFees})
  }
  render(){
    let{vehiculeBrand,vehiculeModel,year,total,delta}=this.props.match.params
    return(
      <div>
        <h1>Votre reservation</h1>
        {vehiculeBrand} {vehiculeModel} {year}<br/>
        Durée de la location {delta} {delta <= 1 ? 'jour' : 'jours'}<br/>
        Prix Total {total}fcfa<br/>
        <Button variant="contained" onClick={this.handleRental}>Payer à l'agence</Button>
      </div>
    )
  }
}

export default Confirmation