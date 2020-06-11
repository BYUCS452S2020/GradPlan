import React, { useEffect } from 'react'
import {SemesterContainer} from '../smart/SemesterContainer'
import {Media} from 'reactstrap'
import {useStateValue} from '../../context'
import { GetPlannedCourses } from '../../ApiCalls'

export const PlanContainer = (props) => {
  const [state, dispatch] = useStateValue()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await GetPlannedCourses(dispatch)
  //   }
  //   fetchData()
  // }, [])

  return (
    <div className='w-25 m-4'>
      {
        state.plannedCourses.map((semester, index) => {
          return (
            <SemesterContainer
              key={index}
              semesterIndex={index}
              title={semester.semester}
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