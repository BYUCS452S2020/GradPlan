import React from 'react'
import {SemesterContainer} from '../dumb'
import {Media} from 'reactstrap'
import {useStateValue} from '../../context'

// For dTesting
// import data from '../../semesterData'

export const PlanContainer = (props) => {
  const [state, dispatch] = useStateValue()
  return (
    <div className='w-25 m-4'>
      {
        state.plannedCourses.map((semester) => {
          return (
            <SemesterContainer
              title={`${semester.semester} ${semester.year}`}
              courses={semester.courses}/>
          )
        })

      }
      <div className='d-flex justify-content-center'>
        <Media className='m-2' src='/plusSM.png'/>
      </div>
    </div>
  )
}