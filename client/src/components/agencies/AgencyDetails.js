import React from 'react'
import axios from 'axios'
import CarCard from '../cars/CarCard'
import { Link } from 'react-router-dom';
import '../agencies/Agency.scss'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PhoneIcon from '@material-ui/icons/Phone';
import MapContainer from './GoogleMap'
import Media from 'react-media';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
require('dotenv').config();


class AgencyDetails extends React.Component{
    state = {
        agency : {
            cars: []
        },
        filteredArray: [],
        selected: ''
    }

    getAgency=()=>{
        axios.get(`${process.env.REACT_APP_APIURL || ""}/api/agencies/${this.props.match.params.id}`)
        .then(responseFromApi=>{
            this.setState({
                agency : responseFromApi.data
            })
        })
        .catch(err=>{
            console.log('Error',err)
        })
    }

    transmission=(value)=>{
        this.setState({
            selected : value,
            filteredArray : this.state.agency.cars.filter(car=>{
                return car.transmission === value
            })
        })
    }

    withAC=(value)=>{
        this.setState({
            selected : value,
            filteredArray : this.state.agency.cars.filter(car=>{
                return car.airConditionner === value
            })
        })
    }

    sortByPrice = (value) => {
        if(value === 'croissant'){
            const sortedArray = [...this.state.agency.cars].sort(function (a, b) {
                return a.feesPerDay - b.feesPerDay;
        })
        this.setState({
            selected : value,
            agency: {
                ...this.state.agency,
                cars: sortedArray
          }
        })
        }
        if(value === 'decroissant'){
            const sortedArray = [...this.state.agency.cars].sort(function (a, b) {
                return b.feesPerDay - a.feesPerDay;
        })
        this.setState({
            selected : value,
            agency : {
                ...this.state.agency,
                cars: sortedArray
          }
        })
        }
    }

    chooseType = (value) => {

        if(value === 'Tous'){
            this.setState({
                selected : value,
                filteredArray : this.state.agency.cars
            })
          }

        if(value === 'Berline'){
        this.setState({
            selected : value,
            filteredArray : this.state.agency.cars.filter(car=>{
                return car.type === value
            })
        })
      }
      if(value === '4X4'){
        this.setState({
            selected : value,
            filteredArray : this.state.agency.cars.filter(car=>{
                return car.type === value
            })
        })
      }
      if(value === 'Sport'){
        this.setState({
            selected : value,
            filteredArray : this.state.agency.cars.filter(car=>{
                return car.type === value
            })
        })
      }
      if(value === 'Luxe'){
        this.setState({
            selected : value,
            filteredArray : this.state.agency.cars.filter(car=>{
                return car.type === value
            })
        })
      }
    }

    componentDidMount(){
        this.getAgency()
    }

    render(){
        
        //this.setState({filteredArray: this.state.agency.cars})
        const availableCars = this.state.agency.cars
        const filteredCars = this.state.filteredArray
        // areFiltersActive is of type boolean
        const areFiltersActive = filteredCars.length 
        // if no active filter show all availableCars
        const displayedCars = areFiltersActive ? filteredCars : availableCars


        return(
            <div className='container'>
                <Media query="(max-width: 768px)">
                {matches =>
                    matches ? (
                        <div className='sub-container'>
                        <div className='agency-infos'>
                        <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src=''/>
                        </ListItemAvatar>
                        <ListItemText
                        primary={`${this.state.agency.name}`}
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className=''
                                color="textPrimary"
                            >
                                Adresse:
                            </Typography>
                            {this.state.agency.address}<br/>
                            N° de téléphone: {this.state.agency.phone}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                        </div>
                        <div className = 'list-container'>
                        <div className='car-list'> 
                            {displayedCars.map(car=>{
                                return(
                                        <div key={car._id} className='card-container'>                        
                                            <Link to={`/agence/${this.state.agency.name}/vehicule/${car.brand}/${car.model}/${car._id}`} style={{ textDecoration: 'none' }} ><div className='car-card'><CarCard car={car}/></div></Link> 
                                        </div> 
                                )
                            })}
                        </div>
                        </div>
                        </div>
                    ) : (
                        <div className='sub-container'>
                        <div className = 'list-container'>
                        <div className='filter-bar'>
                            <FormControl className='form-control'>
                                <InputLabel htmlFor="age-native-simple">Prix</InputLabel>
                                    <Select
                                        native
                                        value={this.state.selected}
                                        onChange={(e)=>this.sortByPrice(e.target.value)}
                                        inputProps={{
                                        name: 'age',
                                        id: 'age-native-simple',
                                        }}
                                    >
                                        <option value='croissant'>Croissant</option>
                                        <option value='decroissant'>Decroissant</option>
                                        </Select>
                            </FormControl>
                            <FormControl className='form-control'>
                                <InputLabel htmlFor="age-native-simple">Transmission</InputLabel>
                                    <Select
                                        native
                                        value={this.state.selected}
                                        onChange={(e)=>this.transmission(e.target.value)}
                                        inputProps={{
                                        name: 'age',
                                        id: 'age-native-simple',
                                        }}
                                    >
                                        <option value='Tous'>Tous</option>
                                        <option value='automatique'>Automatique</option>
                                        <option value='manuelle'>Manuelle</option>
                                        </Select>
                            </FormControl>
                            <FormControl className='form-control'>
                                <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                                    <Select
                                        native
                                        value={this.state.selected}
                                        onChange={(e)=>this.chooseType(e.target.value)}
                                        inputProps={{
                                        name: 'type',
                                        id: 'age-native-simple',
                                        }}
                                    >
                                        <option value='Tous'>Tous</option>
                                        <option value='4X4'>4x4</option>
                                        <option value='Luxe'>Luxe</option>
                                        <option value='Sport'>Sport</option>
                                        <option value='Berline'>Berline</option>
                                        </Select>
                            </FormControl>
                            <FormControl className='form-control'>
                                <InputLabel htmlFor="age-native-simple">Climatisation</InputLabel>
                                    <Select
                                        native
                                        value={this.state.selected}
                                        onChange={(e)=>this.withAC(e.target.value)}
                                        inputProps={{
                                        name: 'airConditionner',
                                        id: 'age-native-simple',
                                        }}
                                    >
                                        <option value='Tous'>Tous</option>
                                        <option value='Climatisée'>Climatisées</option>
                                        <option value='Non climatisée'>Non climatisées</option>
                                        </Select>
                            </FormControl>
                        </div>
                        <div className='car-list'> 
                            {displayedCars.map(car=>{
                                return(
                                        <div key={car._id} className='card-container'>                        
                                            <Link to={`/agence/${this.state.agency.name}/vehicule/${car.brand}/${car.model}/${car._id}`} style={{ textDecoration: 'none' }} ><div className='car-card'><CarCard car={car}/></div></Link> 
                                        </div> 
                                )
                            })}
                        </div>
                        </div>
                        <div className='agency-details'>
                            <h3>{this.state.agency.name}</h3>
                            <h4>{this.state.agency.address}</h4>
                            <h4><PhoneIcon />+{this.state.agency.phone}</h4>
                            <MapContainer agencymap={this.state.agency.latlng}/>
                        </div>
                        </div>
                    )
                }
                </Media>
                
            </div>
        )
    }
}

export default AgencyDetails;
