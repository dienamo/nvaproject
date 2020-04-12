import React from 'react'
import TextField from '@material-ui/core/TextField';
import axios from 'axios'

class ForgotPassword extends React.Component{

  state = {
    email:'',
    showError: false,
    messageFromServer: ''
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  sendEmail=e=>{
    e.preventDefault();
    if(this.state.email === '') {
      this.setState({
        showError: false,
        messageFromServer: ''
      })
    } else {
      axios.post(`${process.env.REACT_APP_APIURL || ""}/api/forgotPassword`,{email: this.state.email})
        .then(response => {
          console.log(response.data)
          if(response.data === 'email not in db') {
            this.setState({
              showError: true,
              messageFromServer: ''
            })
          } else if (response.data === 'recovery email sent') {
            this.setState({
              showError: false,
              messageFromServer: 'recovery email sent'
            })
          }
        })
        .catch(error => console.log(error))
    }
  }

  render() {

    const {email, messageFromServer, showNullError, showError} = this.state;

    return (
      <div>
        <form onSubmit={this.sendEmail}>
        <TextField 
          id = 'email'
          label = ' Adresse mail'
          value = {email}
          name = 'email'
          onChange = {(e)=>this.handleChange(e)}
          placeholder = "marandiaye@gmail.com"
        />
        <button type='submit'>Réinitiliser le mot de passe</button>
        </form>
        {showNullError && (
          <div>
            <p>Veuillez entrer une adresse mail</p>
          </div>
        )}
        {showError && (
          <div>
            <p>
              Cette adresse mail n'est pas reconnue. Veuillez réessayer ou vous inscrire
            </p>
          </div>
        )}
        {messageFromServer === ' recovery email sent' && (
          <div>
            <h3>Le lien de réinitialisation du mot de passe a bien été envoyé!</h3>
          </div>
        )}
      </div>
    )
  }
}

export default ForgotPassword