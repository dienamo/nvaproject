import Component from 'react';
import AuthService from './auth-service';

class Signup extends React.Component {
  
    state = { email: '', password: '' , name: '' , lastname: '' , phonenumber:''};
    service = new AuthService();
  

  // handleChange() and handleSubmit() will be added here

  render(){
    return(
      // more code will be added here
    )
  }
}

export default Signup;