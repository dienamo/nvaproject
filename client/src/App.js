import React, { Component } from 'react';
import './App.css';
import AddCar from './components/cars/AddCar';
import AgencyList from './components/agencies/AgencyList'
import AgencyDetails from './components/agencies/AgencyDetails'
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import CarDetails from './components/cars/CarDetails'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import Redirection from './components/reservation/Redirection'
import AuthService from './components/auth/auth-service';
import UserAccount from './components/auth/UserAccount';
import AdminPage from './components/admin/AdminPage'
//import { Button } from '@material-ui/core';

class App extends Component {
  state = { 
    loggedInUser: null,
    notifications: 0
    
  }
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

  handleNotifications=()=>{
    this.setState({
       notification: this.state.notifications + 1
    })
  }

  installPrompt = null;

  componentDidMount() {
    this.fetchUser();
  }

  render(){
    
    const userStatus = this.state.loggedInUser && this.state.loggedInUser.userStatus
   return (
        <div className="App">
          {userStatus === 'admin' ? '' : <NavBar userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>}
          <Switch>
            <Route exact path="/" render={(props) => (<AgencyList history={props.history}/> )}/>
            <Route exact path="/admin" render={() => <AdminPage userStatus={userStatus}/>} />
            <Route exact path="/moncompte" render={() => <UserAccount getUser={this.getTheUser} userInSession={this.state.loggedInUser}/>} />
            <Route exact path="/signup" render={() => <Signup getUser={this.getTheUser} />} />
            <Route exact path="/login" render={() => <Login getUser={this.getTheUser} userStatus={userStatus}/>} />
            <Route exact path="/forgotPassword" render={() => <ForgotPassword getUser={this.getTheUser}/>} />
            <Route exact path="/reset/:token" component = {ResetPassword} />
            <Route exact path="/agence/:id" component={AgencyDetails} />
            <Route exact path="/admin/ajout" component={AddCar} />
            <Route exact path="/agence/:agenceName/vehicule/:vehiculeBrand/:vehiculeModel/:id" render={() => <CarDetails getUser={this.getTheUser} userInSession={this.state.loggedInUser}/> }/>
            <Route exact path="/redirection" render={(props) => (<Redirection history={props.history} />)} />
          </Switch>
        </div>
      )
  }
  

}

export default App;
