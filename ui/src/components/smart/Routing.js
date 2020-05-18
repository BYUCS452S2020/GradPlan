import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Navbar, NavbarBrand} from 'reactstrap'
import { Navigation } from '../dumb/index';
import { Login } from './Login'
import {PrivateRoute} from './PrivateRoute'
import {PlanningContainer} from './PlanningContainer'

export const Routing = () => {
  return (
    <Router>
      <Navbar color='dark'>
      <NavbarBrand href="/" className='text-white' >GradMasters</NavbarBrand>
        <Navigation />
      </Navbar>
      <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/'>
            <PlanningContainer />
          </PrivateRoute>
        </Switch>
    </Router>
  )
}