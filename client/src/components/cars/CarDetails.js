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
import AcUnitIcon from '@material-ui/icons/AcUnit';
import SettingsIcon from '@material-ui/icons/Settings';
import AirlineSeatLegroomExtraIcon from '@material-ui/icons/AirlineSeatLegroomExtra';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import { withRouter } from "react-router";
moment.locale('fr');

class CarDetails extends React.Component{
    state = {
        car : {},
        dateOut: new Date(),
        dateOfReturn: new Date(),
        open: false,
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

    handleConfirm=(total,numberOfDays,dateOut,dateOfReturn)=>{
        const car = this.state.car._id
        const agency = this.state.car.agency
        axios.post(`http://localhost:5000/api/rentals`,{car,agency,total,numberOfDays,dateOut,dateOfReturn},{withCredentials:true})
            .then(response=>{
                this.props.getUser(response.data)
                this.props.history.push('/redirection')
            })
            .catch(err=>{
                console.log(err)
            })
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
        let dateOut = moment(this.state.dateOut).locale('fr').format('LLLL')
        let dateOfReturn = moment(this.state.dateOfReturn).locale('fr').format('LLLL')
        return(
            <div>
                <div className='car-div'>
                <img src={this.state.car.imageUrl} alt="" className='car-image'/>
                </div>
                <div className='main-container'>
                <Grid container spacing={3}>
                <Grid item xs={6}>
                <Paper className='car-details'>
                    <h1>{this.state.car.brand} {this.state.car.model}</h1>
                    <div className='car-infos'>
                        {this.state.car.airConditionner ? <div className='align-infos'><AcUnitIcon /><h4>Climatisées</h4></div> : <div className='align-infos'><AcUnitIcon /><h4>Non climatisée</h4> </div>}
                        {this.state.car.transmission === 'automatique' ? <div className='align-infos'><SettingsIcon /> <h4>Boite automatique</h4></div> : <div className='align-infos'><SettingsIcon /> <h4>Transmission manuelle</h4></div>}
                        {this.state.car.fuel === 'essence' ? <div className='align-infos'><LocalGasStationIcon /> <h4>Essence</h4></div> : <div className='align-infos'><LocalGasStationIcon /> <h4>Diesel</h4></div>}
                        <div className='align-infos'><AirlineSeatLegroomExtraIcon />{this.state.car.numberOfSeats}<h4>Sièges</h4></div>
                    </div>
                </Paper>
                </Grid>
                 <Grid item xs={6} className='car-reservation'>
                <Paper>
                <h1 style={{display:'inline'}}>{this.state.car.feesPerDay}</h1><h5 style={{display:'inline'}}>/jour</h5>
                <MaterialUIPickers handleDateChange={this.handleStartDateChange} selectedDate={dateOut} label='Date de prise en charge' timeLabel='Heure de prise en charge'/>
                <MaterialUIPickers handleDateChange={this.handleEndDateChange} selectedDate={dateOfReturn} label='Date de retour' timeLabel='Heure de retour'/>
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
                        <p id="simple-modal-description"></p>
                        <h4>{this.state.car.brand} {this.state.car.model} {this.state.car.year}</h4>
                        <h5>Date de prise en charge : {dateOut}</h5>
                        <h5>Date de retour : {dateOfReturn}</h5>
                        <h5>Durée totale : {numberOfDays} jours</h5>
                        <h5>Total : {total}fcfa</h5>
                        <Button variant="contained" onClick={()=>this.handleConfirm(total,numberOfDays,dateOut,dateOfReturn)}>Confirmer</Button>
                        
                    </div>
                </Modal>
                </Paper>
                </Grid>
                </Grid>
                </div>
            </div>
        )
      }
}

export default withRouter(CarDetails);
