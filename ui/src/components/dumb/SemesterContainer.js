import React from 'react'
import PropTypes from 'prop-types'
import {Card} from 'reactstrap'
import { ClassContainer } from './ClassContainer'

export const SemesterContainer = (props) => {
  const {title, courses} = props
  return (
    <div className='flex-column m-2'>
      <h4>{title}</h4>
      <Card>
        {
          courses.map((course) => {
            return (
              <ClassContainer title={`${course.department} ${course.course_number}`} />
            )
          })
        }
      </Card>
    </div>
  )
}

SemesterContainer.propTypes = {
  title: PropTypes.string,
  courses: PropTypes.array,

}