import React from 'react'
import axios from 'axios'

class CarList extends React.Component{
    state={
        listOfCars:[]
    }
    getAllCars=()=>{
        axios.get('http://localhost:5000/api/cars')
        .then(responseFromApi=>{
            this.setState({
                listOfCars : responseFromApi
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
                            {car.name}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default CarList