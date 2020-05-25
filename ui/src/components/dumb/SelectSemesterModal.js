import React from 'react'
import {Modal, ModalBody, ModalFooter, Button} from 'reactstrap'
import { SelectSemester } from './SelectSemester'

export const SelectSemesterModal = (props) => {
  const {toggle, modal, semesters, selectSemester, setSemesterSelected, onAddCourseToPlanned, onSemesterModal} = props
  return (
    <Modal toggle={toggle} isOpen={modal}>
      <ModalBody>
        <SelectSemester semesters={semesters} selectSemester={selectSemester} setSemesterSelected={setSemesterSelected}/>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onAddCourseToPlanned}>Add</Button>
        <Button color="secondary" onClick={onSemesterModal}>Add To Non-Existing Semester</Button>
      </ModalFooter>
    </Modal>
  )
}