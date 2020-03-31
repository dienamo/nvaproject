import React from 'react'
import { Redirect } from 'react-router-dom';
import Header from './Header'

class AdminPage extends React.Component{
  
  render(){
    return(
      <div>
    {this.props.userStatus === 'admin' ?
      <div>
        <Header />
      </div>
     : <Redirect to={{pathname: '/login'}} />
    }
     </div>
    )
    }
    
}

export default AdminPage