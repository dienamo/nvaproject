import React from 'react'
import axios from 'axios'
import CarCard from './CarCard'

class CarList extends React.Component{
    state={
        listOfCars:[]
    }
    getAllCars=()=>{
        axios.get('http://localhost:5000/api/cars')
        .then(responseFromApi=>{
            this.setState({
                listOfCars : responseFromApi.data
            })
        })
        .catch(err=>{
            console.log('Error',err)
        })
    }
    componentDidMount(){
        this.getAllCars()
    }
    render(){
        console.log(this.state.listOfCars)
        return(
            <div>
                {this.state.listOfCars.map(car=>{
                    return(
                        <div>
                            <CarCard brand={car.brand} image={car.imageUrl}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default CarList