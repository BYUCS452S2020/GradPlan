import React from 'react'
import PropTypes from 'prop-types'
import {TabPane, Row, Col} from 'reactstrap'
import { ClassContainer } from './ClassContainer'

export const TabContainer = (props) => {
  const {tabId, courses, onClick} = props
  return (
    <TabPane tabId={tabId}>
      <Row>
        {
          courses.map((course) => {
            let title = course.department + ' ' + course.course_number
            return (
              <ClassContainer
                key={course.id}
                courseID={course.id}
                title={title}
                onClick={onClick}/>
            )
          })
        }
      </Row>
    </TabPane>
  )
}

TabContainer.propTypes = {
  tabId: PropTypes.string,
  courses: PropTypes.array,
  onClick: PropTypes.func,
}