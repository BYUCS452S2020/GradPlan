import React, { useState } from 'react'
import {Card, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {useStateValue} from '../../context'
import {LoginAPI} from '../../ApiCalls'
import {useHistory, useLocation} from 'react-router-dom'

export const Login = (props) => {
  const [state, dispatch] = useStateValue()
  const [email, setEmail] = useState('jacobtamus@gmail.com')
  const [password, setPassword] = useState('tam')
  let history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } }
  const handleLogin = (e) => {
    e.preventDefault()
    LoginAPI(email, password, dispatch)
    history.replace(from)
  }

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
            <Button color="link">link</Button>
          </div>
          </FormGroup>
        </Form>
      </Card>
    </div>
  )
}