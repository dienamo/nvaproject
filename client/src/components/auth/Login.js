import AuthService from './auth-service';
import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'

class Login extends React.Component {
  
    state = { username: '', password: '' };
    service = new AuthService();
  

  // handleChange() and handleSubmit() will be added here
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    
    .then( response => {
      // reset form
    //   this.setState({
    //     username: "", 
    //     password: "",
    //     name: "",
    //     lastname: "",
    //     phonenumber: ""
    //   });
      this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
      <div>
          <form onSubmit={this.handleFormSubmit} className="Login">
          <TextField id="outlined-basic" name="username" value={this.state.username}label="Adresse mail" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="password" value={this.state.password}label="Mot de passe" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <input type="submit" value="login"/>
          </form>
          <p>
          Vous n'avez pas de compte? 
          <Link to={"/signup"} style={{ textDecoration: 'none' }}>S'inscrire</Link>
        </p>
      </div>
    )
  }
}

export default Login;