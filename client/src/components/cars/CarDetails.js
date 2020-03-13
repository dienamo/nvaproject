import React from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../cars/CarDetails.scss'
import Button from '@material-ui/core/Button';
import 'date-fns';
import MaterialUIPickers from '../MaterialUIPickers'
import Modal from '@material-ui/core/Modal';
import moment from 'moment';
import 'moment/locale/fr';  // without this line it didn't work
moment.locale('fr');

class CarDetails extends React.Component{
    state = {
        car : {},
        dateOut: new Date(),
        dateOfReturn: new Date(),
        open: false
    }
    
    getCar=()=>{
        axios.get(`http://localhost:5000/api/cars/${this.props.match.params.id}`)
        .then(responseFromApi=>{
            this.setState({
                car : responseFromApi.data
            })
        })
        .catch(err=>{
            console.log('Error',err)
        })
    }

    handleConfirm=(total,numberOfDays)=>{
        const car = this.state.car.id
        const agency = this.state.car.agency
        axios.post(`http://localhost:5000/api/rentals/`)
    }
    
    componentDidMount(){
        this.getCar()
    }

    handleStartDateChange = date => {
        this.setState({
            dateOut: date
        })
      };

      handleEndDateChange = date => {
        this.setState({
            dateOfReturn: date
        })
      };

      handleOpen=()=>{
        this.setState({
            open: true
        })
      }

      handleClose=()=>{
        this.setState({
            open: false
        })
      }
      
    render(){
        // eslint-disable-next-line react/no-direct-mutation-state
        let numberOfDays = Math.ceil((this.state.dateOfReturn --- this.state.dateOut) / (1000 * 60 * 60 * 24));
        let total = this.state.car.feesPerDay*numberOfDays;
        return(
            <div>
                <img src={this.state.car.imageUrl} alt=""/>
                <Grid container spacing={3}>
                <Grid item xs={6}>
                <Paper className='car-details'><h1>{this.state.car.brand} {this.state.car.model}</h1></Paper>
                </Grid>
                 <Grid item xs className='car-reservation'>
                <Paper>
                <h1 style={{display:'inline'}}>{this.state.car.feesPerDay}</h1><h5 style={{display:'inline'}}>/jour</h5>
                <MaterialUIPickers handleDateChange={this.handleStartDateChange} selectedDate={this.state.dateOut} label='Date de prise en charge' timeLabel='Heure de prise en charge'/>
                <MaterialUIPickers handleDateChange={this.handleEndDateChange} selectedDate={this.state.dateOfReturn} label='Date de retour' timeLabel='Heure de retour'/>
                <h3>{numberOfDays} jours</h3>
                <h3>Total:{total}</h3>
                <Button variant="contained" onClick={this.handleOpen}>Payer à l'agence</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    >
                    <div className='confirmation-modal'>
                        <h2 id="simple-modal-title">Details de votre réservation</h2>
                        <p id="simple-modal-description">
                        <h4>{this.state.car.brand} {this.state.car.model} {this.state.car.year}</h4>
                        <h5>Date de prise en charge : {moment(this.state.dateOut).locale('fr').format('LLLL')}</h5>
                        <h5>Date de retour : {moment(this.state.dateOfReturn).locale('fr').format('LLLL')}</h5>
                        <h5>Durée totale : {numberOfDays} jours</h5>
                        <h5>Total : {total}fcfa</h5>
                        <Button variant="contained" onClick={()=>this.handleConfirm(total,numberOfDays)}>Confirmer</Button>
                        </p>
                    </div>
                </Modal>
                </Paper>
                </Grid>
                </Grid>
                
            </div>
        )
      }
}

export default CarDetails;
