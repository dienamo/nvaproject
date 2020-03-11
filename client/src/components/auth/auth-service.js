import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    });
  }
  signup = (email, password, name, lastname) => {
    return this.service.post('/signup', {email, password})
      .then(response => response.data)
  }

}

export default AuthService;