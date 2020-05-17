import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useStateValue} from '../../context'
export const PrivateRoute = ({ children, ...rest }) => {
  const [state] = useStateValue()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        state.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}