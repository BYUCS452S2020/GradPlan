import React from 'react'
import {Card, CardTitle} from 'reactstrap'
export const ClassContainer = (props) => {
  return (
    <Card className='m-2 p-1'>
      <CardTitle>{props.title}</CardTitle>
    </Card>
  )
}