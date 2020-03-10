import React from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Confirmation extends React.Component{
  rental=()=>{
    axios.post(`http://localhost:5000/api/rentals`)
  }
  render(){
    console.log(this.props.match.params)
    let{vehiculeBrand,vehiculeModel,year,total,delta}=this.props.match.params
    return(
      <div>
        <h1>Votre reservation</h1>
        {vehiculeBrand} {vehiculeModel} {year}<br/>
        Durée de la location {delta} {delta <= 1 ? 'jour' : 'jours'}<br/>
        Prix Total {total}fcfa<br/>
        <Button variant="contained">Payer à l'agence</Button>
      </div>
    )
  }
}

export default Confirmation