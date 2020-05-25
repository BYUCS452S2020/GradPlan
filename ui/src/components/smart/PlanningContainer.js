import React from 'react'
import { PlanContainer } from '../dumb'
import {GroupsContainer} from './GroupsContainer'


export const PlanningContainer = (props) => {
  return (
    <div className='d-flex justify-content-between'>
      <PlanContainer />
      <GroupsContainer />
    </div>
  )
}