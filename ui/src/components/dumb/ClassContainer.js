import React from 'react'
import PropTypes from 'prop-types'
import {Card, CardTitle} from 'reactstrap'


export const ClassContainer = (props) => {
  const {onClick} = props
  return (
    <Card className='m-2 p-1' onClick={(e) => onClick(props.courseID, e, props.index)}>
      <CardTitle>{props.title}</CardTitle>
    </Card>
  )
}

ClassContainer.propTypes = {
  onClick: PropTypes.func
}