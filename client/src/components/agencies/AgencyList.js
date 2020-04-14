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
import CarCard from '../cars/CarCard'
import { Link } from 'react-router-dom';
import './Agency.scss'
require('dotenv').config();


class Agency extends React.Component{
    state={
        listOfAgencies: [],
        listOfCars: [],
        selected: '',
        installButton: false
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

    getAllCars=()=>{
        axios.get(`${process.env.REACT_APP_APIURL || ""}/api/cars`) // en dev: http://localhost:500/agencies / en prod: /agencies
        .then(responseFromApi=>{
            this.setState({
                listOfCars : responseFromApi.data
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
        this.getAllCars()
        console.log("Listening for Install prompt");
    window.addEventListener('beforeinstallprompt',e=>{
      // For older browsers
      //e.preventDefault();
      console.log("Install Prompt fired");
      this.installPrompt = e;
      // See if the app is already installed, in that case, do nothing
      if((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true){
        return false;
      }
      // Set the state variable to make button visible
      this.setState({
        installButton:true
      })
    })
    }

    installApp=async ()=>{
        if(!this.installPrompt) return false;
        this.installPrompt.prompt();
        let outcome = await this.installPrompt.userChoice;
        if(outcome.outcome==='accepted'){
          console.log("App Installed")
        }
        else{
          console.log("App not installed");
        }
        // Remove the event reference
        this.installPrompt=null;
        // Hide the button
        this.setState({
          installButton:false
        })
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
                    <MenuItem value='5e8c8b7da57e700662673ac2' className='agency-name'>NVA Dakar VDN</MenuItem>
                    <MenuItem value='5e8c8ab9a57e700662673ac1' className='agency-name'>Aéroport international de Dakar-Yoff <FlightTakeoffIcon /></MenuItem>
                    <MenuItem value='5e8c8c89a57e700662673ac3' className='agency-name'>Aéroport International Blaise Diagne <FlightTakeoffIcon /></MenuItem>
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
                <h2 style={{color: 'dimgrey'}}>Nos services</h2>
                <div className='flex-container'>
                    <div className='user-infos'>
                        <img src={parking} alt=""/>
                        <h3>Un parc automobile varié adapté à vos besoins</h3>
                        <p>Trouvez la <strong>voiture de location</strong> la mieux adaptée à vos besoins et bénéficiez de notre gamme complète de services en réservant directement sur notre site.</p> 
                    </div>
                    <div className='user-infos'>
                        <img src={handkey} alt=""/>
                        <h3>Réservez en toute confiance</h3>
                        <p>Nous proposons un service de <strong>location de voiture </strong>très simple et flexible dans notre agence de <strong>Dakar VDN</strong>.</p>
                    </div>
                    <div className='user-infos'>
                        <img src={phone} alt=""/>
                        <h3>Votre location à portée de main</h3>
                        <p>Vous pouvez à présent prolonger votre location où que vous soyez avec notre <strong>version mobile</strong>!</p>
                    </div>
                    <div className='user-infos'>
                        <img src={driver} alt=""/>
                        <h3>Location avec chauffeur</h3>
                        <p>Pour que vos déplacements professionnels ou privés deviennent un moment de détente, nous avons conçu des forfaits d’une demie journée ou d’une journée complète de <strong>location de véhicule avec chauffeur</strong>.</p>
                    </div>
                </div>
            </section>
            <h2 style={{color: 'dimgrey'}}>Toute notre gamme de véhicules</h2>
            <section className='all-cars'>
            {this.state.listOfCars.map(car=>{
                return(
                    <div key={car._id} className='card-container'>                        
                        <Link to={`/agence/${car.agency.name}/vehicule/${car.brand}/${car.model}/${car._id}`} style={{ textDecoration: 'none' }} ><div className='car-card'><CarCard car={car}/></div></Link> 
                    </div> 
                    )
                })}
            </section>
            {this.state.installButton ? <button onClick={this.installApp}>Install As Application</button> : ''}
            </div>
        )
    }
}

export default Agency