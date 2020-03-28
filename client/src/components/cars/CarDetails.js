import React from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import '../cars/CarDetails.scss'
import Button from '@material-ui/core/Button';
import 'date-fns';
import Modal from '@material-ui/core/Modal';
import moment from 'moment';
import 'moment/locale/fr';  // without this line it didn't work
import clim from '../../images/clim.png';
import transmission from '../../images/transmission.png'
import seat from '../../images/seat.png'
import station from '../../images/station.png'
import { withRouter } from "react-router";
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";
import Radio from '@material-ui/core/Radio';
import {DateTimePicker , MuiPickersUtilsProvider} from '@material-ui/pickers'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
moment.locale('fr');

class CarDetails extends React.Component{
    state = {
        car : {
            images:[]
        },
        dateOut: new Date(),
        dateOfReturn: new Date(),
        open: false,
        checked: false,
        driverFees:0
    }
    
    getCar=()=>{
        axios.get(`${process.env.REACT_APP_APIURL || ""}/api/cars/${this.props.match.params.id}`)
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
        const driverFees = this.state.driverFees
        axios.post(`${process.env.REACT_APP_APIURL || ""}/api/rentals`,{car,agency,total,numberOfDays,dateOut,dateOfReturn,driverFees},{withCredentials:true})
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
        this.props.userInSession ? this.setState({
            open: true
        })
        : this.props.history.push('/login')
      }

      handleClose=()=>{
        this.setState({
            open: false
        })
      }

      handleCheck=(event)=>{
          this.state.checked ? this.setState({
            checked:false,
            driverFees: 0
        }) : this.setState({
            checked:true,
            driverFees: 30000
        })
          
      }
      
    render(){
        // eslint-disable-next-line react/no-direct-mutation-state
        let numberOfDays = Math.ceil((this.state.dateOfReturn --- this.state.dateOut) / (1000 * 60 * 60 * 24));
        let driverFees = this.state.driverFees * numberOfDays;
        let total = (this.state.car.feesPerDay*numberOfDays) + driverFees;
        let dateOut = moment(this.state.dateOut).locale('fr').format('LLLL')
        let dateOfReturn = moment(this.state.dateOfReturn).locale('fr').format('LLLL')

        
        return(
            <div>
                <div className='car-div'>
                <Carousel>
                <div>
                    <img src={this.state.car.imageUrl} alt="" className='car-image'/>  
                </div>
                    {this.state.car.images.map(image=>{
                        return(
                            <div>
                                <img src={image} alt="" className='car-image'/> 
                            </div>
                        )
                    })}
                    </Carousel>
                </div>
                <div className='main-container'>
                <div className='car-details'>
                <Paper >
                    <h1>{this.state.car.brand} {this.state.car.model}</h1>
                    <div className='car-infos'>
                        {this.state.car.airConditionner ? <div className='align-infos'><img src={clim} alt=''/> <h4>Climatisées</h4></div> : <div className='align-infos'><img src={clim} alt=''/> <h4>Non climatisée</h4> </div>}
                        {this.state.car.transmission === 'automatique' ? <div className='align-infos'><img src={transmission} alt=''/> <h4>Automatique</h4></div> : <div className='align-infos'><img src={transmission} alt=''/><h4>Manuelle</h4></div>}
                        {this.state.car.fuel === 'essence' ? <div className='align-infos'><img src={station} alt=''/> <h4>Essence</h4></div> : <div className='align-infos'><img src={station} alt=''/> <h4>Diesel</h4></div>}
                        <div className='align-infos'><img src={seat} alt=''/> <h4>{this.state.car.numberOfSeats} Sièges</h4></div>
                    </div>
                </Paper>
                </div>
                <div className='rental-infos'>
                <Paper>
                <h1 style={{display:'inline'}}>{this.state.car.feesPerDay}</h1><h5 style={{display:'inline'}}> fcfa/jour</h5>
                <div className='date-time-picker'>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                        <p><DateTimePicker value={dateOut} onChange={this.handleStartDateChange} minDate={new Date()} ampm={false} autoOk={true} disableToolbar={true} format="d MMM yyyy HH:mm" label='Date de prise en charge' className='date-time-picker'/></p>
                        <p><DateTimePicker value={dateOfReturn} onChange={this.handleEndDateChange} minDate={new Date()} ampm={false} autoOk={true} disableToolbar={true} format="d MMM yyyy HH:mm" label='Date de retour' className='date-time-picker'/></p>
                    </MuiPickersUtilsProvider>
                </div>
                {total <= 0 ? '' : <div><h3>{numberOfDays} {numberOfDays > 1 ? 'jours' : 'jour'}</h3>
                <label>Avec chauffeur
                <Radio
                    checked={this.state.checked}
                    onClick={this.handleCheck}
                    value={30000}
                    name="radio-button"
                    inputProps={{ 'aria-label': 'A' }}
                />
                </label>
                <h3>Total: {total} fcfa</h3>
                <Button variant="contained" onClick={this.handleOpen}>Payer à l'agence</Button></div>}
                </Paper>
                </div>
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
                        <h5>Total : {total} fcfa</h5>
                        <Button variant="contained" onClick={()=>this.handleConfirm(total,numberOfDays,dateOut,dateOfReturn)}>Confirmer</Button>
                    </div>
                </Modal>
                </div>
            </div>
        )
      }
}

export default withRouter(CarDetails);
