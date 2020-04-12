import AuthService from './auth-service';
import React from 'react'
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './Login.scss'
import logo from '../../images/black-logo-nva.png'


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
      this.props.userStatus === 'admin'? this.props.history.push('/admin') : this.props.history.push('/')
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
      //     <form onSubmit={this.handleFormSubmit} className="Login">
      //     <TextField id="outlined-basic" name="username" value={this.state.username}label="Adresse mail" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
      //     <TextField id="outlined-basic" name="password" value={this.state.password}label="Mot de passe" variant="outlined" className='text-field' onChange={ e => this.handleChange(e)}/>
      //     <input type="submit" value="login"/>
      //     </form>
      //     <p>
      //     Vous n'avez pas de compte? 
      //     <Link to={"/signup"} style={{ textDecoration: 'none' }}>S'inscrire</Link>
      //   </p>
      // </div>
      <Grid container component="main" className='root'>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className='image' />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className='paper'>
          <Avatar className='avatar'>
            <img src={logo} alt='' style={{width: '50px'}}/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <form className='form' onSubmit={this.handleFormSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse mail"
              name="username"
              autoComplete="email"
              autoFocus
              value={this.state.username}
              onChange={ e => this.handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className='submit'
            >
              Connexion
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link to={"/signup"} href="#" variant="body2">
                  {"Vous n'avez pas de compte? Inscription"}
                </Link>
                <Link to={"/forgotPassword"} href="#" variant="body2">
                  {"Mot de passe oublié"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
    )
  }
}

export default withRouter(Login);