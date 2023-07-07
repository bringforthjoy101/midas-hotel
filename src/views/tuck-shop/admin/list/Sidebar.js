// ** Custom Components
import Sidebar from '@components/sidebar'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { swal, apiRequest } from '@utils'
import { getAllData, getFilteredData } from '../store/action'

// ** Third Party Components
import { Button, FormGroup, Label, FormText } from 'reactstrap'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: ''
  })
  // ** Function to handle form submit
  const onSubmit = async (event, errors) => {
    event?.preventDefault()
    if (errors && !errors.length) {
      const body = JSON.stringify(userData)
      try {
        const response = await apiRequest({url:'/register', method:'POST', body}, dispatch)
        if (response) {
          if (response.data.status) {
            swal('Great job!', response.data.message, 'success')
            dispatch(getAllData())
            setUserData({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              phone: '',
              role: ''
            })
            toggleSidebar()
          } else {
            setUserData({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              phone: '',
              role: ''
            })
            swal('Oops!', response.data.message, 'error')
          }
        } else {
          swal('Oops!', 'Something went wrong with your network.', 'error')
        }
        
      } catch (error) {
        console.error({error})
      }
    }
  }

  useEffect(() => {
    onSubmit()
    dispatch(getAllData())
  }, [dispatch])

    return (
      <Sidebar
        size='lg'
        open={open}
        title='New Admin'
        headerClassName='mb-1'
        contentClassName='pt-0'
        toggleSidebar={toggleSidebar}
      >
        <AvForm onSubmit={onSubmit}>
          <FormGroup>
            <Label for='firstName'>First Name</Label>
            <AvInput 
              name='firstName' 
              id='firstName' 
              placeholder='First Name' 
              value={userData.firstName}
              onChange={e => setUserData({...userData, firstName: e.target.value})}
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label for='lastName'>Last Name</Label>
            <AvInput 
              name='lastName' 
              id='lastName' 
              placeholder='Last Name' 
              value={userData.lastName}
              onChange={e => setUserData({...userData, lastName: e.target.value})}
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <AvInput 
              type='email' 
              name='email' 
              id='email' 
              placeholder='admin.user@mail.com' 
              value={userData.email}
              onChange={e => setUserData({...userData, email: e.target.value})}
              required 
            />
            <FormText color='muted'>You can use letters, numbers & periods</FormText>
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password</Label>
            <AvInput 
              type='password' 
              name='password' 
              id='password' 
              placeholder='Password' 
              value={userData.password}
              onChange={e => setUserData({...userData, password: e.target.value})}
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label for='phone'>Phone</Label>
            <AvInput 
              name='phone' 
              id='phone' 
              placeholder='08012345678' 
              value={userData.phone}
              onChange={e => setUserData({...userData, phone: e.target.value})}
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label for='role'>Admin Role</Label>
            <AvInput 
              type='select' 
              id='role' 
              name='role' 
              value={userData.role}
              onChange={e => setUserData({...userData, role: e.target.value})}
              required
            >
              <option value=''>Select Role</option>
              <option value='sales rep'>Sales Rep</option>
              <option value='store'>Store</option>
              <option value='busary'>Busary</option>
              <option value='manager'>Manager</option>
            </AvInput>
          </FormGroup>
          <Button type='submit' className='mr-1' color='primary'>
            Submit
          </Button>
          <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
            Cancel
          </Button>
        </AvForm>
      </Sidebar>
    )
}


export default SidebarNewUsers
