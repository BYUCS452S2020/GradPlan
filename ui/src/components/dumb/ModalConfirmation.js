import React from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

export const ModalConfirmation = props => {
  const {toggle, modal, className, onDelete, message} = props
  return (
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>Comfirmation</ModalHeader>
      <ModalBody>
        {message}
      </ModalBody>
      <ModalFooter>
        <Button onClick={(e) => onDelete(e)}>Delete</Button>
      </ModalFooter>
    </Modal>
  )
}