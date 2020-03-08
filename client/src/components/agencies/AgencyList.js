import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

class Agency extends React.Component{
    state={
        listOfAgencies: []
    }
    getAllAgencies=()=>{
        axios.get('http://localhost:5000/api/agencies')
        .then(responseFromApi=>{
            this.setState({
                listOfAgencies : responseFromApi.data
            })
        })
        .catch(err=>{
            console.log('Error',err)
        })
    }
    componentDidMount(){
        this.getAllAgencies()
    }
    render(){
        return(
            <div>
                {this.state.listOfAgencies.map(agency=>{
                    return(
                        <div key={agency._id}>
                            <Link to={`/agence/${agency._id}`}>{agency.name}</Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Agency