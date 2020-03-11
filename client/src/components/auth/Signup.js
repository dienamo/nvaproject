import AuthService from './auth-service';
import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'

class Signup extends React.Component {
  
    state = { username: '', password: '' , name: '' , lastname: '' , phonenumber:''};
    service = new AuthService();
  

  // handleChange() and handleSubmit() will be added here
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const name = this.state.name;
    const lastname = this.state.lastname;
    const phonenumber = this.state.phonenumber

    this.service.signup(username, password, name, lastname, phonenumber)
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
          <form onSubmit={this.handleFormSubmit} className="Signup">
          <TextField id="outlined-basic" name="username" value={this.state.username}label="Adresse mail" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="password" value={this.state.password}label="Mot de passe" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="lastname" value={this.state.lastname}label="NOM" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="name" value={this.state.name}label="Prenom" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <TextField id="outlined-basic" name="phonenumber" value={this.state.phonenumber}label="Numéro de téléphone" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
          <input type="submit" value="submit"/>
          </form>
          <p>
          Déja un compte? 
          <Link to={"/"} style={{ textDecoration: 'none' }}>Se connecter</Link>
        </p>
      </div>
    )
  }
}

export default Signup;