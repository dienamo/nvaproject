import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
                <FormControl variant="outlined" className='agencies-list'>
                    <InputLabel ref='{inputLabel} 'id="demo-simple-select-outlined-label">
                    Agence
                    </InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value='{age}'
                    onChange='{handleChange}'
                    labelWidth='{labelWidth}'
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Aéroport international de Dakar-Yoff</MenuItem>
                    <MenuItem value={20}>Aéroport International Blaise Diagne</MenuItem>
                    <MenuItem value={30}>NVA Mermoz</MenuItem>
                    </Select>
                </FormControl>
                {this.state.listOfAgencies.map(agency=>{
                    return(
                        <div key={agency._id}>
                            <Link to={`/agence/${agency._id}`} style={{ textDecoration: 'none' }}>{agency.name}</Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Agency