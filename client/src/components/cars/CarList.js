import React from 'react'
import axios from 'axios'
import CarCard from './CarCard'
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import service from '../../api/service'

class CarList extends React.Component{
    state={
        listOfCars:[],
        open: false,
        updatedCar:"",
    }
    getAllCars=()=>{
        axios.get(`${process.env.REACT_APP_APIURL || ""}/api/cars`)
        .then(responseFromApi=>{
            this.setState({
                listOfCars : responseFromApi.data
            })
        })
        .catch(err=>{
            console.log('Error',err)
        })
    }
    handleFormSubmit = (event) => {
        event.preventDefault();

        const {available,agency,feesPerDay,numberPlate,imageUrl} = this.state
        
        axios.put(`${process.env.REACT_APP_APIURL || ""}/api/cars/${this.state.updatedCar}`, {imageUrl,available,agency,feesPerDay,numberPlate,})
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
            
            deleteCar=(deletedCar)=>{
                axios.delete(`${process.env.REACT_APP_APIURL || ""}/api/cars/${deletedCar}`)
                .then(response =>{
                    this.setState({
                        listOfCars : this.state.listOfCars.filter(car => car._id !== response.data.carId)
                    })       
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            
            handleOpen=(updatedCar)=>{
                this.setState({
                    open: true,
                    updatedCar: updatedCar
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

    componentDidMount(){
        this.getAllCars()
    }
    render(){
        return(
            <div>
                {this.state.listOfCars.map(car=>{
                    return(
                        <div key={car._id}>
                            <CarCard car={car} isAdmin={true} isAvailable={true} handleDelete={this.deleteCar} handleOpen={this.handleOpen} handleClose={this.handleClose}/>
                            <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}
                            >
                            <div className='confirmation-modal'>
                                <h2 id="simple-modal-title">Mise à jour du vehicule</h2>
                                <form onSubmit={this.handleFormSubmit} className="AddCar">
                                    <TextField id="outlined-basic" name="available" value={this.state.available}label="Disponible" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
                                    <TextField id="outlined-basic" name="agency" value={this.state.agency}label="Agence" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
                                    <TextField id="outlined-basic" name="feesPerDay" value={this.state.feesPerDay}label="Tarif journalier" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
                                    <TextField id="outlined-basic" name="numberPlate" value={this.state.numberPlate}label="Numéro de plaque" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
                                    <input type='file' name="imageUrl" onChange={(e) => this.handleFileUpload(e)}/>
                                    <input type="submit" value="submit"/>
                                </form>
                                <p id="simple-modal-description"></p>                         
                            </div>
                            </Modal>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default CarList