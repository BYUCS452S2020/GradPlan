
import {ACTIONTYPES} from './const'

export const LoginAPI = (email, password, dispatch) => {
  console.log('Login')
  dispatch({type: ACTIONTYPES.isAuthenticated, payload: true})
}