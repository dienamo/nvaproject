import React from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import '../cars/CarDetails.scss'
import DatetimeRangePicker from 'react-datetime-range-picker';

class CarDetails extends React.Component{
    state = {
        car : {},
        delta: '',
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
    
    handler=(startDate)=>{
        let date = (startDate.end --- startDate.start)/(1000*60*60*24)
        this.setState({
            delta:date
        })
        console.log(this.state.delta)
     };

    render(){
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
                <DatetimeRangePicker onChange={this.handler}/>
                    <h3>Total:{this.state.car.feesPerDay*this.state.delta}</h3>
                </Paper>
                </Grid>
                </Grid>
                
            </div>
        )
    }
}

export default CarDetails;
