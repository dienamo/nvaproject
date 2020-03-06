import React, { Component } from 'react';
import './App.css';
import AddCar from './components/cars/AddCar';
import CarList from './components/cars/CarList'

class App extends Component {
  render(){
   return (
        <div className="App">
          <AddCar />
          <CarList />
        </div>
      )
  }

  

}

export default App;
