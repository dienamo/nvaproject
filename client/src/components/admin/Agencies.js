import React from 'react'
import axios from 'axios'

class Agencies extends React.Component{

  state={
    listOfAgencies:[]
  }

  getAllAgencies=()=>{
    axios.get(`${process.env.REACT_APP_API_URL || ""}/api/agencies`)
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
              {agency.address}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Agencies