import React from 'react'
import axios from 'axios'
import CarCard from '../cars/CarCard'
import { Link } from 'react-router-dom';
import '../agencies/Agency.scss'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PhoneIcon from '@material-ui/icons/Phone';


class AgencyDetails extends React.Component{
    state = {
        agency : {
            cars: []
        },
        filteredArray: [],
        selected: ''
    }

    getAgency=()=>{
        axios.get(`http://localhost:5000/api/agencies/${this.props.match.params.id}`)
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
                                <option value="" />
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
                                <option value="" />
                                <option value='automatique'>Automatique</option>
                                <option value='manuelle'>Manuelle</option>
                                <option value='Tous'>Tous</option>
                                </Select>
                    </FormControl>
                    <FormControl className='form-control'>
                        <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                            <Select
                                native
                                value=''
                                onChange={this.chooseType}
                                inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                                }}
                            >
                                <option value="" />
                                <option value={10}>4x4</option>
                                <option value={20}>Luxe</option>
                                <option value={30}>Sport</option>
                                </Select>
                    </FormControl>
                    <FormControl className='form-control'>
                        <InputLabel htmlFor="age-native-simple">Climatisation</InputLabel>
                            <Select
                                native
                                value={this.state.selected}
                                onChange={(e)=>this.withAC(e.target.value)}
                                inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                                }}
                            >
                                <option value="" />
                                <option value='climatisées'>Climatisée</option>
                                <option value={20}>Non-climatisée</option>
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
                </div>
                </div>
            </div>
        )
    }
}

export default AgencyDetails;
