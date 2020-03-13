import React from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../cars/CarDetails.scss'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import 'date-fns';
import MaterialUIPickers from '../MaterialUIPickers'
import moment from 'moment'
import 'moment/locale/fr'

class CarDetails extends React.Component{
    state = {
        car : {},
        delta: '',
        sDate: new Date(),
        eDate: new Date()
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
    
    componentDidMount(){
        this.getCar()
    }

    handleStartDateChange = date => {
    
        console.log('date de prise en charge',date)
        this.setState({
            sDate: date
        })
      };

      handleEndDateChange = date => {
    
        console.log('date de retour',date)
        this.setState({
            eDate: date
        })
      };
      
    
    render(){
        // eslint-disable-next-line react/no-direct-mutation-state
        let numberOfDays = Math.ceil((this.state.eDate --- this.state.sDate) / (1000 * 60 * 60 * 24));
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
                <MaterialUIPickers handleDateChange={this.handleStartDateChange} selectedDate={this.state.sDate} label='Date de prise en charge' timeLabel='Heure de prise en charge'/>
                <MaterialUIPickers handleDateChange={this.handleEndDateChange} selectedDate={this.state.eDate} label='Date de retour' timeLabel='Heure de retour'/>
                <h3>{numberOfDays} jours</h3>
                <h3>Total:{total}</h3>
                <Link to={`/agence/${this.state.car.agency}/vehicule/${this.state.car.brand}/${this.state.car.model}/${this.state.car.year}/${this.state.car._id}/reservation/${total}/${numberOfDays}/${moment(this.state.sDate).locale('fr').format('LLLL')}/${moment(this.state.eDate).locale('fr').format('LLLL')}`} ><Button variant="contained">Reserver</Button></Link>
                </Paper>
                </Grid>
                </Grid>
                
            </div>
        )
    }
}

export default CarDetails;
