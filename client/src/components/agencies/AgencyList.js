import React from 'react'
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import Typist from 'react-typist';
import handkey from '../../images/handkey.png'
import driver from '../../images/driver.png'
import parking from '../../images/parking.png'
import phone from '../../images/phone.png'
import './Agency.scss'
require('dotenv').config();


class Agency extends React.Component{
    state={
        listOfAgencies: [],
        selected: ''
    }
    getAllAgencies=()=>{
        axios.get(`${process.env.REACT_APP_APIURL || ""}/api/agencies`) // en dev: http://localhost:500/agencies / en prod: /agencies
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
                <Typist className='typist'>
                    Profitez de notre gamme complète de véhicules directement en ligne
                </Typist>
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
                    {/* 5e66959a715a600f4689cf47   5e7f34478468ef0bbca17c79 */}
                    <MenuItem value='5e669f290e4eee105dd20e03' className='agency-name'>NVA Mermoz</MenuItem>
                    <MenuItem value='5e66959a715a600f4689cf47' className='agency-name'>Aéroport international de Dakar-Yoff <FlightTakeoffIcon /></MenuItem>
                    <MenuItem value='5e66968a715a600f4689cf48' className='agency-name'>Aéroport International Blaise Diagne <FlightTakeoffIcon /></MenuItem>
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
                <div className='flex-container'>
                    <div className='user-infos'>
                        <img src={parking} alt=""/>
                
                    </div>
                    <div className='user-infos'>
                        <img src={handkey} alt=""/>
                    </div>
                    <div className='user-infos'>
                        <img src={phone} alt=""/>
                    </div>
                    <div className='user-infos'>
                        <img src={driver} alt=""/>
                    </div>
                </div>
            </section>
            <section >

            </section>
            </div>
        )
    }
}

export default Agency