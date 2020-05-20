import React from 'react'
import { PlanContainer, GroupsContainer } from '../dumb'



export const PlanningContainer = (props) => {
  return (
    <div className='d-flex justify-content-between'>
      <PlanContainer />
      <GroupsContainer />
    </div>
  )
}