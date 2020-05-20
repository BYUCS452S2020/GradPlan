import React from 'react'
import PropTypes from 'prop-types'
import { NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

export const Tab = (props) => {
  const { activeTab, toggle, id} = props

  return (
    <NavItem>
      <NavLink
        className={classnames({ active: activeTab === id })}
        onClick={() => { toggle(id.toString()); }}>
        {`Group ${id}`}
      </NavLink>
    </NavItem>
  )
}

Tab.propTypes = {
  activeTab: PropTypes.string,
  toggle: PropTypes.func,
  id: PropTypes.number,
}