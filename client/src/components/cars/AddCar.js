import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../cars/AddCar.scss'
import axios from 'axios'
import service from '../../api/service'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class AddCar extends Component {
  state={
    brand: "",model: "",type: "",year:"",numberOfSeats: "",numberOfDoors: "",transmission:"",airConditionner:"",
    available:"",agency: "",feesPerDay: "",numberPlate: "",imageUrl: "",fuel: "",images: []
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    
    const {brand,model,year,type,numberOfSeats,numberOfDoors,transmission,airConditionner,available,agency,feesPerDay,numberPlate,imageUrl,fuel,images} = this.state
    
    axios.post(`${process.env.REACT_APP_APIURL || ""}/api/cars`, {brand,model,type,year,numberOfSeats,numberOfDoors,transmission,airConditionner,imageUrl,available,agency,feesPerDay,numberPlate,fuel,images})
      .then((car) => {
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

handleFileUpload = e => {
  console.log("The file to be uploaded is: ", e.target.files[0]);

  const uploadData = new FormData();
  // imageUrl => this name has to be the same as in the model since we pass
  // req.body to .create() method when creating a new thing in '/api/things/create' POST route
  uploadData.append("imageUrl", e.target.files[0]);
  
  service.handleUpload(uploadData)
      .then(response => {
          // console.log('response is: ', response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
          this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
          console.log("Error while uploading the file: ", err);
      })
  ;
}

handleFilesUpload = e => {
  console.log("The file to be uploaded is: ", e.target.files[0]);

  const uploadData = new FormData();
  // imageUrl => this name has to be the same as in the model since we pass
  // req.body to .create() method when creating a new thing in '/api/things/create' POST route
  uploadData.append("imageUrl", e.target.files[0]);
  
  service.handleUpload(uploadData)
      .then(response => {
          // console.log('response is: ', response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
          this.setState({ images:  this.state.images.concat(response.secure_url)});
      })
      .catch(err => {
          console.log("Error while uploading the file: ", err);
      })
  ;
}
  render(){
   return (
        <div>
          <h1>Ajout d'un vehicule</h1>
          <form onSubmit={this.handleFormSubmit} className="AddCar">
          <TextField id="outlined-basic" name="brand" value={this.state.brand}label="Marque" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="model" value={this.state.model}label="Model" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="year" value={this.state.year}label="Année" type='Number' variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          {/* <TextField id="outlined-basic" name="type" value={this.state.type}label="Type" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/> */}
          <FormControl variant="outlined" className='text-field'>
            <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.type}
              onChange={ e => this.handleChange(e)}
              label="Type"
              name='type'
            >
              <MenuItem value='Berline'>Berline</MenuItem>
              <MenuItem value='4X4'>4X4</MenuItem>
              <MenuItem value='Sport'>Sport</MenuItem>
              <MenuItem value='Luxe'>Luxe</MenuItem>
            </Select>
          </FormControl>
          <TextField id="outlined-basic" name="numberOfSeats" value={this.state.numberOfSeats}label="Nombre de siège" type='Number' variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="numberOfDoors" value={this.state.numberOfDoors}label="Nombre de portes" type='Number' variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          {/* <TextField id="outlined-basic" name="transmission" value={this.state.transmission}label="Transmission" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/> */}
          <FormControl variant="outlined" className='text-field'>
            <InputLabel id="demo-simple-select-outlined-label">Transmission</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.transmission}
              onChange={ e => this.handleChange(e)}
              label="Transmission"
              name='transmission'
            >
              <MenuItem value='automatique'>Automatique</MenuItem>
              <MenuItem value='manuelle'>Manuelle</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className='text-field'>
            <InputLabel id="demo-simple-select-outlined-label">Carburant</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.fuel}
              onChange={ e => this.handleChange(e)}
              label="Fuel"
              name='fuel'
            >
              <MenuItem value='essence'>Essence</MenuItem>
              <MenuItem value='diesel'>Diesel</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className='text-field'>
            <InputLabel id="demo-simple-select-outlined-label">Climatisation</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.airConditionner}
              onChange={ e => this.handleChange(e)}
              label="Climatistion"
              name='airConditionner'
            >
              <MenuItem value='Climatisée'>Oui</MenuItem>
              <MenuItem value='Non climatisée'>Non</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className='text-field'>
            <InputLabel id="demo-simple-select-outlined-label">Disponibilité</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.available}
              onChange={ e => this.handleChange(e)}
              label="Disponibilité"
              name='available'
            >
              <MenuItem value={true}>Disponible</MenuItem>
              <MenuItem value={false}>Indisponible</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField id="outlined-basic" name="fuel" value={this.state.fuel}label="Carburant" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/> */}
          {/* <TextField id="outlined-basic" name="airConditionner" value={this.state.airConditionner}label="Air conditionnée" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="available" value={this.state.available}label="Disponible" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/> */}
          {/* 5e66959a715a600f4689cf47   5e7f34478468ef0bbca17c79 */}
          <FormControl variant="outlined" className='text-field'>
          <InputLabel id="demo-simple-select-outlined-label">Agence</InputLabel>
          <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.agency}
              onChange={ e => this.handleChange(e)}
              label="Agence"
              name='agency'
            >
              <MenuItem value='5e8c8b7da57e700662673ac2'>NVA Dakar VDN</MenuItem>
              <MenuItem value='5e8c8ab9a57e700662673ac1'>Aéroport international de Dakar-Yoff</MenuItem>
              <MenuItem value='5e8c8c89a57e700662673ac3'>Aéroport International Blaise Diagne</MenuItem>
            </Select>
          </FormControl>
          <TextField id="outlined-basic" name="feesPerDay" value={this.state.feesPerDay}label="Tarif journalier" type='Number' variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="numberPlate" value={this.state.numberPlate}label="Numéro de plaque" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <label>Image principale
          <input type='file' name="imageUrl" onChange={(e) => this.handleFileUpload(e)}/>
          </label>
          <label>Autres images
          <input type='file' name="images" multiple onChange={(e) => this.handleFilesUpload(e)}/>
          </label>
          <input type="submit" value="submit"/>
          </form>
        </div>
      )
  }  

}

export default AddCar;

