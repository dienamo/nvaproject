import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../cars/AddCar.scss'
import axios from 'axios'

class AddCar extends Component {
  state={
    brand: "",model: "",type: "",numberOfSeats: "",numberOfDoors: "",transmission:"",airConditionner:"",
    mainImgUrl:"",available:"",agency: "",feesPerDay: "",numberPlate: ""
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    
    const {brand,model,type,numberOfSeats,numberOfDoors,transmission,airConditionner,mainImgUrl,available,agency,feesPerDay,numberPlate} = this.state
    
    axios.post("http://localhost:5000/api/cars", {brand,model,type,numberOfSeats,numberOfDoors,transmission,airConditionner,mainImgUrl,available,agency,feesPerDay,numberPlate})
      .then(() => {
          // this.props.getData();
          // Reset form
          // this.setState({
          //   brand: "",model: "",type: "",numberOfSeats: "",numberOfDoors: "",transmission:"",airConditionner:"",
          //   mainImgUrl:"",agency: "",feesPerDay: "",numberPlate: ""
          // });
      })
      .catch(error => console.log(error))
  }
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}
  render(){
   return (
        <div>
          <h1>Ajout d'un vehicule</h1>
          <form onSubmit={this.handleFormSubmit} className="AddCar">
          <TextField id="outlined-basic" name="brand" value={this.state.brand}label="Marque" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="model" value={this.state.model}label="Model" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="type" value={this.state.type}label="Type" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="numberOfSeats" value={this.state.numberOfSeats}label="Nombre de siège" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="numberOfDoors" value={this.state.numberOfDoors}label="Nombre de portes" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="transmission" value={this.state.transmission}label="Transmission" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="airConditionner" value={this.state.airConditionner}label="Air conditionnée" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="mainImgUrl" value={this.state.mainImgUrl}label="Image" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="available" value={this.state.available}label="Disponible" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="agency" value={this.state.agency}label="Agence" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="feesPerDay" value={this.state.feesPerDay}label="Tarif journalier" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="numberPlate" value={this.state.numberPlate}label="Numéro de plaque" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <input type="submit" value="submit"/>
          </form>
        </div>
      )
  }  

}

export default AddCar;

