import React, { Component } from 'react';
import './App.css';
import AddCar from './components/cars/AddCar';
import CarList from './components/cars/CarList'
import AgencyList from './components/agencies/AgencyList'
import AgencyDetails from './components/agencies/AgencyDetails'
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import CarDetails from './components/cars/CarDetails'

class App extends Component {
  render(){
   return (
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={AgencyList} />
            <Route exact path="/agence/:id" component={AgencyDetails} />
            <Route exact path="/admin/ajout" component={AddCar} />
            <Route exact path="/admin/liste" component={CarList} />
            <Route exact path="/agence/:agenceName/vehicule/:vehiculeBrand/:vehiculeModel/:id" component={CarDetails} />
          </Switch>
        </div>
      )
  }
  

}

export default App;
