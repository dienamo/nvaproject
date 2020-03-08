import React from 'react'
import axios from 'axios'
import CarCard from '../cars/CarCard'
import { Link } from 'react-router-dom';

class AgencyDetails extends React.Component{
    state = {
        agency : {
            cars: []
        }
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
    
    componentDidMount(){
        this.getAgency()
    }
    
    render(){
        return(
            <div>
                {this.state.agency.phone}
                {this.state.agency.cars.map(car=>{
                    return(
                        <div key={car._id}>
                           <Link to={`/agence/${this.state.agency.name}/vehicule/${car.brand}/${car.model}/${car._id}`}><CarCard brand={car.brand} image={car.imageUrl}/></Link> 
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default AgencyDetails;
