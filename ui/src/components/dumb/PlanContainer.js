import React from 'react'
import {SemesterContainer} from '../dumb'
import {Media} from 'reactstrap'

// For dTesting
import data from '../../semesterData'

export const PlanContainer = (props) => {
  return (
    <div className='w-25 m-4'>
      {
        data.student.planned_courses.map((semester) => {
          return (
            <SemesterContainer
              title={`${semester.semester} ${semester.year}`}
              courses={semester.course}/>
          )
        })

      }
      <div className='d-flex justify-content-center'>
        <Media className='m-2' src='/plusSM.png'/>
      </div>
    </div>
  )
}