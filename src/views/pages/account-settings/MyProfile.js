import { Fragment, useState } from 'react'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert } from 'reactstrap'

const GeneralTabs = ({ data }) => {
	// const [email, setEmail] = useState(data.email || '')
	const [fullName, setFullName] = useState(data.fullName || '')
	// const [lastName, setLastName] = useState(data.lastName || '')
	const [phone, setPhone] = useState(data.phone || '')

	const onChange = (e) => {
		const reader = new FileReader(),
			files = e.target.files
		reader.onload = function () {
			setAvatar(reader.result)
		}
		reader.readAsDataURL(files[0])
	}

	return (
		<Fragment>
			{/* <Media>
        <Media className='mr-25' left>
          <Media object className='rounded mr-50' src={avatar} alt='Generic placeholder image' height='80' width='80' />
        </Media>
        <Media className='mt-75 ml-1' body>
          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
            Upload
            <Input type='file' onChange={onChange} hidden accept='image/*' />
          </Button.Ripple>
          <Button.Ripple color='secondary' size='sm' outline>
            Reset
          </Button.Ripple>
          <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
        </Media>
      </Media> */}
			<AvForm className="mt-2" onSubmit={(e) => e.preventDefault()}>
				<Row>
					<Col sm="6">
						<FormGroup>
							<Label for="fullName">Full Name</Label>
							<AvInput
								id="fullName"
								name="fullName"
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								placeholder="Full Name"
								required
							/>
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="phone">Phone</Label>
							<AvInput type="phone" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
						</FormGroup>
					</Col>
					{/* <Col className='mt-75' sm='12'>
            <Alert className='mb-50' color='warning'>
              <h4 className='alert-heading'>Your email is not confirmed. Please check your inbox.</h4>
              <div className='alert-body'>
                <a href='/' className='alert-link' onClick={e => e.preventDefault()}>
                  Resend confirmation
                </a>
              </div>
            </Alert>
          </Col> */}
					<Col className="mt-2" sm="12">
						<Button.Ripple className="mr-1" color="primary">
							Save changes
						</Button.Ripple>
						<Button.Ripple color="secondary" outline>
							Cancel
						</Button.Ripple>
					</Col>
				</Row>
			</AvForm>
		</Fragment>
	)
}

export default GeneralTabs
