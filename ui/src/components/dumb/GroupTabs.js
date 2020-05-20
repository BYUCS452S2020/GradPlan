import React from 'react'
import PropTypes from 'prop-types'
import { Nav } from 'reactstrap'

import { Tab } from './Tab'

export const GroupTabs = (props) => {
  const { activeTab, toggle, data} = props
  console.log(data)
  return (
    <Nav tabs>
      {
        data.CourseGroups.map((group) => {
          return (
            <Tab
              activeTab={activeTab}
              toggle={toggle}
              key={group.id}
              id={group.id}/>)
        })
      }

    </Nav>
  )
}

GroupTabs.propTypes = {
  activeTab: PropTypes.string,
  toggle: PropTypes.func,
  data: PropTypes.object,
}