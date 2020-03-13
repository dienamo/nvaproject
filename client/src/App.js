import React, { Component } from 'react';
import './App.css';
import AddCar from './components/cars/AddCar';
import CarList from './components/cars/CarList'
import AgencyList from './components/agencies/AgencyList'
import AgencyDetails from './components/agencies/AgencyDetails'
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import CarDetails from './components/cars/CarDetails'
import Reservation from './components/reservation/Reservation'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import AuthService from './components/auth/auth-service';

class App extends Component {
  state = { loggedInUser: null }
  service = new AuthService()

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  fetchUser() {
    if (this.state.loggedInUser === null){
      this.service.loggedin()
        .then(response => {
          this.setState({loggedInUser: response})
        })
        .catch(err => {
          this.setState({loggedInUser: false}) 
        })
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  render(){
   return (
        <div className="App">
          <NavBar userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>
          <Switch>
            <Route exact path="/" component={AgencyList} />
            <Route exact path="/signup" render={() => <Signup getUser={this.getTheUser}/>} />
            <Route exact path="/login" render={() => <Login getUser={this.getTheUser}/>} />
            <Route exact path="/agence/:id" component={AgencyDetails} />
            <Route exact path="/admin/ajout" component={AddCar} />
            <Route exact path="/admin/liste" component={CarList} />
            <Route exact path="/agence/:agenceName/vehicule/:vehiculeBrand/:vehiculeModel/:id" component={CarDetails} />
            <Route exact path="/agence/:agenceName/vehicule/:vehiculeBrand/:vehiculeModel/:year/:id/reservation/:total/:delta/:sDate/:eDate" component={Reservation} />
          </Switch>
        </div>
      )
  }
  

}

export default App;
