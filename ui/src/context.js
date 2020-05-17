import React, {useContext} from 'react'
import {PropTypes} from 'prop-types'
const AppContext = React.createContext()
export const StateProvider = ({reducer, initialState, children}) => {
  return (
    <AppContext.Provider value={React.useReducer(reducer, initialState)}>
      {children}
    </AppContext.Provider>
  )
}

StateProvider.propTypes = {
  reducer: PropTypes.func,
  initialState: PropTypes.object,
  children: PropTypes.any,
}

export const useStateValue = () => {
  return useContext(AppContext)
}