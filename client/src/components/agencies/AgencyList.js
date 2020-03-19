import React from 'react'
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';




class Agency extends React.Component{
    state={
        listOfAgencies: [],
        selected: ''
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

    handleSelect=(value)=>{
        this.setState({
            selected: value
        })
    }

    handleSeach=()=>{
        this.props.history.push(`/agence/${this.state.selected}`)
    }

    componentDidMount(){
        this.getAllAgencies()
    }
    render(){
        return(
            <div>
                <section className='select-container'>
                <Paper className='form-container' elevation={3}>
                <FormControl variant="outlined" className='agencies-list'>
                    <InputLabel ref='{inputLabel} 'id="demo-simple-select-outlined-label">
                    Agences
                    </InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.selected}
                    onChange={(e)=>this.handleSelect(e.target.value)}
                    labelWidth='{labelWidth}'
                    displayEmpty={false}
                    >
                    {/* <MenuItem value="">
                        <em>None</em>
                    </MenuItem> */}
                    <MenuItem value='5e669f290e4eee105dd20e03'>NVA Mermoz</MenuItem>
                    <MenuItem value='5e66959a715a600f4689cf47'>Aéroport international de Dakar-Yoff <FlightTakeoffIcon /></MenuItem>
                    <MenuItem value='5e66968a715a600f4689cf48'>Aéroport International Blaise Diagne <FlightTakeoffIcon /></MenuItem>
                    </Select>
                <div className='search-button'>
                <Button onClick={(e)=>{this.handleSeach(e.target.value)}}
                    variant="contained"
                    color="black"
                    className=''
                >
                    Rechercher un véhicule
                </Button>
                </div>
                </FormControl>
                </Paper>
                </section>
            
            <section className='louer'>
                
            </section>
            </div>
        )
    }
}

export default Agency