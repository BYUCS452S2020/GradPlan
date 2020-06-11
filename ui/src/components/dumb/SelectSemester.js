import React from 'react'
import {Form, FormGroup, Label, Input} from 'reactstrap'

export const SelectSemester = (props) => {
  const {selectSemester, setSemesterSelected} = props
  return (
    <Form>
      <FormGroup>
        <Label> Choose Semester:</Label>
        <Input type='select' value={selectSemester} onChange={setSemesterSelected}>
          {
            props.semesters.map((value) => {
              return <option>{value.semester}</option>
            })
          }
        </Input>
      </FormGroup>
    </Form>
  )
}