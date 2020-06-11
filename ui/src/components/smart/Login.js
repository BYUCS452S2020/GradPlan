import React, { useState } from 'react'
import {Card, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {useStateValue} from '../../context'
import {LoginAPI, RegisterAPI} from '../../ApiCalls'
import {useHistory, useLocation} from 'react-router-dom'
import { RegisterModal } from '../dumb'


export const Login = (props) => {
  const [state, dispatch] = useStateValue()
  const [email, setEmail] = useState('jacobtamus@gmail.com')
  const [password, setPassword] = useState('tam')
  const [name, setName] = useState({first_name: '', last_name: ''})
  const [registerModal, setRegisterModal] = useState(false)
  let history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } }

  const handleLogin = async (e) => {
    e.preventDefault()
    await LoginAPI(email, password, dispatch)
    history.replace(from)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setRegisterModal(!registerModal)
    await RegisterAPI(email, password, name, dispatch)
    history.replace(from)
  }

  const onClickRegister = async (e) => {
    e.preventDefault()
    setRegisterModal(!registerModal)
  }

  const handleFirstName = (e) => {
    setName({
      ...name,
      first_name: e.target.value
    })
  }

  const handleLastName = (e) => {
    setName({
      ...name,
      last_name: e.target.value
    })
  }

  const registerToggle = () => setRegisterModal(!registerModal)
  const handleEmail = e => setEmail(e.target.value)
  const handlePassword = e => setPassword(e.target.value)

  return (
    <div className='d-flex justify-content-center'>
      <Card className='card my-5 w-50'>
        <h2 className='m-3 text-center'>Login</h2>
        <Form className='p-4'>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@gmail.com" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              value={password}
              id="examplePassword"
              onChange={e => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
          <div className='align-items-center d-flex flex-column justify-content-center'>
            <Button color='success' className='w-25' onClick={handleLogin}>Login</Button>
            <Button color="link" onClick={onClickRegister}>Register</Button>
          </div>
          </FormGroup>
        </Form>
      </Card>
      <RegisterModal
        toggle={registerToggle} modal={registerModal} handleEmail={handleEmail}
        email={email} handlePassword={handlePassword} password={password}
        handleRegister={handleRegister} name={name} handleFirstName={handleFirstName}
        handleLastName={handleLastName}/>
    </div>
  )
}