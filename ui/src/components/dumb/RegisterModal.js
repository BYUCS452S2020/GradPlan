import React from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Button} from 'reactstrap'

export const RegisterModal = props => {
  const {toggle, modal, className, email, handleEmail,
    password, handlePassword, handleRegister, name, handleLastName,
    handleFirstName} = props
  return (
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>Register</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Email</Label>
            <Input value={email} onChange={handleEmail} type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label>First Name</Label>
            <Input value={name.first_name} onChange={handleFirstName} type="text" placeholder="john" />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input value={name.last_name} onChange={handleLastName} type="text" placeholder="zhu" />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input value={password} onChange={handlePassword} type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleRegister}>Register</Button>
      </ModalFooter>
    </Modal>
  )
}