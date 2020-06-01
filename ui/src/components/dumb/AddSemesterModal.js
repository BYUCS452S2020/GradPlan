import React from 'react'
import {Modal, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input} from 'reactstrap'
export const AddSemesterModal = (props) => {
  const {toggle, modal, onChangeSemester, onChangeYear, onAdd} = props
  return (
    <Modal toggle={toggle} isOpen={modal}>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Semester</Label>
            <Input type='text' onChange={onChangeSemester}/>
          </FormGroup>
          <FormGroup>
            <Label>Year</Label>
            <Input type='number' onChange={onChangeYear}/>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onAdd}>Add</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}