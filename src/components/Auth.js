import React, { Component } from 'react'
import axios from 'axios'
import { getJwt } from '../helpers/jwt'

export default class Auth extends Component {

    state = {
        user: undefined
    };
      
  
    async componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            window.location = '/login'
        }
  
        const res = await axios.get('http://localhost:4000/auth', {
          headers: { 'x-token': jwt }
        })
        if(res.data.success === true){
            this.setState({user: res.data.admin})
        }
    }
  
    render() {
      if (this.state.user === undefined) {
        return (
          <div><h1>Loading...</h1></div>
        );
      }
  
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  
}

