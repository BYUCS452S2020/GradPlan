import {ACTIONTYPES} from './const'
export const reducer = (state, action) => {
  switch(action.type) {
    case ACTIONTYPES.isAuthenticated:
      return {
        ...state,
        isAuthenticated: action.payload
      }
  }
}