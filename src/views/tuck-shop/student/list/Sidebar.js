// ** Custom Components
import Sidebar from '@components/sidebar'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { swal, apiRequest } from '@utils'
import { getAllData, getFilteredData } from '../store/action'

// ** Third Party Components
import { Button, FormGroup, Label, Spinner, CustomInput } from 'reactstrap'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    otherName: '',
    type: '',
    className: '',
    year: '',
    group: '',
    avatar: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const uploadImage = async (event) => {
    console.log('hi')
    event?.preventDefault()
    console.log(event)
      const formData = new FormData()
      formData.append("image", event.target.files[0])
      try {
        const response = await apiRequest({
          url: "/upload-images",
          method: "POST",
          body: formData
        })
        if (response) {
          if (response?.data?.status) {
            const avatar = response.data.data
            // setIsSubmitting(false)
            setUserData({ ...userData, avatar })
          } else {
            swal("Oops!", response.data.message, "error")
          }
        } else {
          swal("Oops!", "Something went wrong with your image.", "error")
        }
      } catch (error) {
        console.error({ error })
      }
  }

  // ** Function to handle form submit
  const onSubmit = async (event, errors) => {
    setIsSubmitting(true)
    event.preventDefault()
    console.log({errors})
    if (errors) setIsSubmitting(false)
    if (errors && !errors.length) {
      console.log({userData})
      setIsSubmitting(true)
      const body = JSON.stringify(userData)
      try {
        const response = await apiRequest({url:'/students/create', method:'POST', body}, dispatch)
        console.log({response})
        if (response.data.status) {
          setIsSubmitting(false)
            swal('Great job!', response.data.message, 'success')
            dispatch(getAllData())
            toggleSidebar()
        } else {
          setIsSubmitting(false)
          swal('Oops!', response.data.message, 'error')
        }
      } catch (error) {
        setIsSubmitting(false)
        console.error({error})
      }
    }
  }

    return (
      <Sidebar
        size='lg'
        open={open}
        title='New Student'
        headerClassName='mb-1'
        contentClassName='pt-0'
        toggleSidebar={toggleSidebar}
      >
        <AvForm onSubmit={onSubmit}>
          <FormGroup>
            <Label for='image'>Student Image</Label>
            <CustomInput type='file' id='image' name='image' accept='image/*' onChange={e => uploadImage(e)} required  />
          </FormGroup>
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
            <Label for='otherName'>Other Name</Label>
            <AvInput 
              name='otherName' 
              id='otherName' 
              placeholder='Other Name' 
              value={userData.otherName}
              onChange={e => setUserData({...userData, otherName: e.target.value})}
            />
          </FormGroup>
          <FormGroup>
            <Label for='role'>Student Type</Label>
            <AvInput 
              type='select' 
              id='type' 
              name='type' 
              value={userData.type}
              onChange={e => setUserData({...userData, type: e.target.value})}
              required
            >
              <option value=''>Select Student Type</option>
              <option value='boarding'>Boarding</option>
              <option value='day'>Day</option>
            </AvInput>
          </FormGroup>
          <FormGroup>
            <Label for='role'>Student Class</Label>
            <AvInput 
              type='select' 
              id='className' 
              name='className' 
              value={userData.className}
              onChange={e => setUserData({...userData, className: e.target.value})}
              required
            >
              <option value=''>Select Student Class</option>
              <option value='junior'>Junior (JSS)</option>
              <option value='senior'>Senior (SS)</option>
            </AvInput>
          </FormGroup>
          <FormGroup>
            <Label for='role'>Student Year</Label>
            <AvInput 
              type='select' 
              id='year' 
              name='year' 
              value={userData.year}
              onChange={e => setUserData({...userData, year: e.target.value})}
              required
            >
              <option value=''>Select Student Year</option>
              <option value='7'>Seven (7)</option>
              <option value='8'>Eight (8)</option>
              <option value='9'>Nine (9)</option>
              <option value='10'>Ten (10)</option>
              <option value='11'>Eleven (11)</option>
              <option value='12'>Twelve (12)</option>
            </AvInput>
          </FormGroup>
          <FormGroup>
            <Label for='role'>Student Group</Label>
            <AvInput 
              type='select' 
              id='group' 
              name='group' 
              value={userData.group}
              onChange={e => setUserData({...userData, group: e.target.value})}
              required
            >
              <option value=''>Select Student Group</option>
              <option value='A'>A</option>
              <option value='W'>W</option>
              <option value='R'>R</option>
            </AvInput>
          </FormGroup>
          <Button type='submit' className='mr-1' color='primary' disabled={isSubmitting}>
            {isSubmitting && <Spinner color='white' size='sm' />}
            <span className='ml-50'>Submit</span>
          </Button>
          <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
            Cancel
          </Button>
        </AvForm>
      </Sidebar>
    )
}


export default SidebarNewUsers
