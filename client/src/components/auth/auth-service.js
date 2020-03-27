import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_APIURL || ""}/api`,
      withCredentials: true
    });
  }
  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  signup = (username, password, name, lastname, phonenumber, address) => {
    return this.service.post('/signup', {username, password,name,lastname,phonenumber, address})
      .then(response => {
        console.log(response.data)
        // return response.data
      })
  }
  loggedin = () => {
    return this.service.get('/loggedin').then(response => response.data)
  }


  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }

  userAccount = (id) =>{
    return this.service.get('/moncompte' , {id})
      .then(response => response.data)
  }

  isreadynumber = (id) =>{
    return this.service.get('/isreadynumber' , {id})
      .then(response => response.data)
  }

  readbyuser = (ids) =>{
    return this.service.put('/readbyuser' , {ids})
      .then(response => response.data)
  }

}

export default AuthService;