import React from 'react'
import TextField from '@material-ui/core/TextField';
import axios from 'axios'

class ResetPassword extends React.Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    update: false,
    isLoading: true,
    error: false
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/reset` , {params:{resetToken: this.props.match.params.token}})
    .then(response => {
      if(response.data.message === 'password reset link a-ok') {
        this.setState({
          username:  response.data.username,
          update: false,
          isLoading: false,
          error: false
        });
       } else {
          this.setState({
            update: false,
            isLoading: false,
            error: true
          })
        }
      }
    )
    .catch(error => console.log(error.data))
  }
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  updatePassword=e=>{
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/updatePassword` , {
      username: this.state.username,
      password: this.state.password
    })
    .then(response=>{
      console.log(response.data);
      if (response.data.message === 'password updated') {
        this.setState({
          updated: true,
          error: false,
        })
      }  else  {
        this.setState({
          updated: false,
          error: true
        })
      }
    })
    .catch(error => {
      console.log(error.data)
    })
  }
  render(){

    const{password , error , isLoading , updated} = this.state;

    if (error) {
      return (
        <div>
          <h4>Un problème est survenu. Veuillez envoyer un autre lien.</h4>
        </div>
      )
    } else if (isLoading) {
      return(
        <div>
          Chargement...
        </div>
      )
    }
    else{
      return (
        <div>
          <form onSubmit={this.updatePassword}>
            <TextField 
            id = 'password'
            label = 'Nouveau mot de passe'
            onChange = {(e)=>this.handleChange(e)}
            name = 'password'
            value = {password}
            type = 'password'
            />
            <button type='submit'>Mettre à jour</button>
          </form>
          {updated && (
            <div>
              <p>
                Le mot de passe a été réinitialisé avec succès
              </p>
            </div>
          )}
        </div>
      )
    }
  }
}

export default ResetPassword