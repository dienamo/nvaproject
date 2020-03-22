import AuthService from './auth-service';
import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './Signup.scss'

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
      this.props.history.push('/')
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
      // <div>
      //     <form onSubmit={this.handleFormSubmit} className="Signup">
      //     <TextField id="outlined-basic" name="username" value={this.state.username}label="Adresse mail" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
      //     <TextField id="outlined-basic" name="password" value={this.state.password}label="Mot de passe" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
      //     <TextField id="outlined-basic" name="lastname" value={this.state.lastname}label="NOM" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
      //     <TextField id="outlined-basic" name="name" value={this.state.name}label="Prenom" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
      //     <TextField id="outlined-basic" name="phonenumber" value={this.state.phonenumber}label="Numéro de téléphone" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
      //     <input type="submit" value="submit"/>
      //     </form>
      //     <p>
      //     Déja un compte? 
      //     <Link to={"/"} style={{ textDecoration: 'none' }}>Se connecter</Link>
      //   </p>
      // </div>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className='paper'>
        <Avatar className='avatar'>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>
        <form className='form' onSubmit={this.handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="lname"
                name="lastname"
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Nom"
                autoFocus
                value={this.state.lastname}
                onChange={ e => this.handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Pénom"
                name="name"
                autoComplete="fname"
                value={this.state.name}
                onChange={ e => this.handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="username"
                autoComplete="email"
                value={this.state.username}
                onChange={ e => this.handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Adresse"
                name="address"
                autoComplete="address"
                value={this.state.address}
                onChange={ e => this.handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone-number"
                label="N° de téléphone"
                name="phonenumber"
                autoComplete="phone-number"
                value={this.state.phonenumber}
                onChange={ e => this.handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={ e => this.handleChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className='submit'
          >
            Inscription
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" to={"/login"} >
                Déja un compte? Connexion
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    )
  }
}

export default withRouter(Signup);