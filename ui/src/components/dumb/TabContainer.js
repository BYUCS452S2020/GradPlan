import React from 'react'
import PropTypes from 'prop-types'
import {TabPane, Row, Col} from 'reactstrap'
import { ClassContainer } from './ClassContainer'

export const TabContainer = (props) => {
  const {tabId, courses} = props
  return (
    <TabPane tabId={tabId}>
      <Row>
        {
          courses.map((course) => {
            let title = course.department + ' ' + course.course_number
            return (
              <Col key={course.id}>
                <ClassContainer title={title} />
              </Col>
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
}