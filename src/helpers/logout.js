import {getJwt} from './jwt'

export const logout = () => {
    const jwt = getJwt();
    if(jwt){
        localStorage.removeItem('x-token')
        window.location = '/login'
    }
  };