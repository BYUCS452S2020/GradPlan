import React from 'react'
import {Link} from 'react-router-dom'
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

export const Navigation = (props) => {
  return (
    <Nav>
      <NavItem>
        <NavLink className='text-white' tag={Link} to='/login'>
          Logout
        </NavLink>
      </NavItem>
    </Nav>
  )
}