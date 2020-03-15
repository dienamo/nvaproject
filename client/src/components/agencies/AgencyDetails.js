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
        fileredArray: []
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
        if(value === 'automatique') {
            const automatiqueCars=this.state.agency.cars.filter(car=>{
                return car.transmission === 'automatique'
            })
            this.setState({
                agency: {
                    ...this.state.agency,
                    cars: automatiqueCars
              }
            })
        }
        if(value === 'manuelle') {
            const manualCars=this.state.agency.cars.filter(car=>{
                return car.transmission === 'manuelle'
            })
            this.setState({
                agency: {
                    ...this.state.agency,
                    cars: manualCars
              }
            })
        }
    }

    sortByPrice = (value) => {
        if(value === 'croissant'){
            const sortedArray = [...this.state.agency.cars].sort(function (a, b) {
                return a.feesPerDay - b.feesPerDay;
        })
        this.setState({
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
            agency: {
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
        const carArray =this.state.agency.cars
        return(
            <div className='container'>
            
            <div className='container'>
                <div className='car-list'>
                <div className='filter-bar'>
                    <FormControl className='form-control'>
                        <InputLabel htmlFor="age-native-simple">Prix</InputLabel>
                            <Select
                                native
                                value=''
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
                                value=''
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
                                value=''
                                onChange={this.getAC}
                                inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                                }}
                            >
                                <option value="" />
                                <option value={10}>Climatisée</option>
                                <option value={20}>Non-climatisée</option>
                                </Select>
                    </FormControl>
                </div>
                    {carArray.map(car=>{
                        return(
                            <div key={car._id} className='car-card'>                          
                                <Link to={`/agence/${this.state.agency.name}/vehicule/${car.brand}/${car.model}/${car._id}`} style={{ textDecoration: 'none' }} ><CarCard car={car}/></Link> 
                            </div>
                        )
                    })}
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
