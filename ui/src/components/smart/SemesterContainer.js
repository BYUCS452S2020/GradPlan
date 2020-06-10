import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Card} from 'reactstrap'
import { ClassContainer, ModalConfirmation } from '../dumb'
import {DeletePlannedCourses} from '../../ApiCalls'
import { useStateValue } from '../../context'
import { ACTIONTYPES } from '../../const'

export const SemesterContainer = (props) => {
  const {title, courses, semesterIndex} = props
  const [confirmation, setConfirmation] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState()
  const [selectedCourseIndex, setSelectedCourseIndex] = useState()
  const [state, dispatch] = useStateValue()
  const confirmationToggle = () => setConfirmation(!confirmation)

  const onClassContainerClick = (courseID, e, index) => {
    e.preventDefault()
    setSelectedCourseIndex(index)
    setSelectedCourse(courseID)
    setConfirmation(true)
  }

  const onDelete = async (e) => {
    e.preventDefault()
    let status = await DeletePlannedCourses(selectedCourse)
    if (status === 204) {
      let plannedCourses = state.plannedCourses
      plannedCourses[semesterIndex].courses.splice(setSelectedCourseIndex, 1)
      setConfirmation(false)
      dispatch({type: ACTIONTYPES.replacePlannedCourses,payload: plannedCourses})
    }
  }
  return (
    <div className='flex-column m-2'>
      <h4>{title}</h4>
      <Card>
        {
          courses.map((course, index) => {
            if (course !== undefined) {
              console.log(course)
              return (
                <ClassContainer
                  key={index}
                  index={index}
                  title={`${course.department} ${course.course_number}`}
                  courseID={course.course_id}
                  onClick={onClassContainerClick}/>
              )
            }
          })
        }
      </Card>
      <ModalConfirmation toggle={confirmationToggle} modal={confirmation}
            message={`Are your sure you would like to remove this course from the semester ${title}`}
            selectedCourseID={selectedCourse} onDelete={onDelete}/>
    </div>
  )
}

SemesterContainer.propTypes = {
  title: PropTypes.string,
  courses: PropTypes.array,
}