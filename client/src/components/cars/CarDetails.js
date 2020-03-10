import React from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../cars/CarDetails.scss'
import Button from '@material-ui/core/Button';
import DatetimeRangePicker from 'react-datetime-range-picker';
import { Link } from 'react-router-dom';


class CarDetails extends React.Component{
    state = {
        car : {},
        delta: '',
        sDate: '',
        eDate: ''
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
    
    handler=(selectedDate)=>{
        let date = (selectedDate.end --- selectedDate.start)/(1000*60*60*24);
        let eDate = selectedDate.end;
        let sDate = selectedDate.start;
        console.log(selectedDate)
        this.setState({
            delta:date,
            sDate: sDate,
            eDate:eDate
        })
    };
    
    render(){
        let total=this.state.car.feesPerDay*this.state.delta
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
                    {/* <h3>Du {this.state.sDate} au {this.state.eDate}</h3> */}
                    <h3>Total:{total}</h3>
                    <Link to={`/agence/${this.state.car.agency}/vehicule/${this.state.car.brand}/${this.state.car.model}/${this.state.car.year}/${this.state.car._id}/reservation/${total}/${this.state.delta}`}><Button variant="contained">Reserver</Button></Link>
                </Paper>
                </Grid>
                </Grid>
                
            </div>
        )
    }
}

export default CarDetails;
