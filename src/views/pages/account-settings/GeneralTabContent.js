import { Fragment, useState } from 'react'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Spinner } from 'reactstrap'
import { swal, apiRequest } from '@utils'
import { useDispatch } from 'react-redux'

const GeneralTabs = ({ data }) => {
	const [email, setEmail] = useState(data.email || '')
	const [name, setName] = useState(data.name || '')
	const [logo, setLogo] = useState(data.logo || '')
	const [phone, setPhone] = useState(data.phone || '')
	const [address, setAddress] = useState(data.address || '')
	const [bankName, setBankName] = useState(data.bankName || '')
	const [accountName, setAccountName] = useState(data.accountName || '')
	const [bankAccountNumber, setBankAccountNumber] = useState(data.bankAccountNumber || '')

	const [isSubmitting, setIsSubmitting] = useState(false)
	const dispatch = useDispatch()

	const onChange = (e) => {
		const reader = new FileReader(),
			files = e.target.files
		reader.onload = async function () {
			setLogo(reader.result)
			const formData = new FormData()
			formData.append('image', files[0])
			try {
				const response = await apiRequest({
					url: '/upload-images',
					method: 'POST',
					body: formData,
				})
				if (response) {
					if (response?.data?.status) {
						const avatar = response.data.data
						// setIsSubmitting(false)
						setLogo(avatar)
						// console.log(avatar)
					} else {
						swal('Oops!', response.data.message, 'error')
					}
				} else {
					swal('Oops!', 'Something went wrong with your image.', 'error')
				}
			} catch (error) {
				console.error({ error })
			}
		}
		reader.readAsDataURL(files[0])
	}

	// ** Function to handle form submit
	const onSubmit = async (event, errors) => {
		setIsSubmitting(true)
		event.preventDefault()
		console.log({ errors })
		if (errors) setIsSubmitting(false)
		if (errors && !errors.length) {
			setIsSubmitting(true)
			// console.log(logo)
			const body = JSON.stringify({ email, name, logo, phone, address, bankName, accountName, bankAccountNumber })
			try {
				const url = data ? `/businesses/update/${data.id}` : `/businesses/create/`
				const response = await apiRequest({ url, method: 'POST', body }, dispatch)
				// console.log({ response })
				if (response.data.status) {
					setIsSubmitting(false)
					swal('Great job!', response.data.message, 'success')
					// dispatch(getAllData())
				} else {
					setIsSubmitting(false)
					swal('Oops!', response.data.message, 'error')
				}
			} catch (error) {
				setIsSubmitting(false)
				console.error({ error })
			}
		}
	}

	return (
		<Fragment>
			<Media>
				<Media className="mr-25" left>
					<Media object className="rounded mr-50" src={logo} alt="Generic placeholder image" height="80" width="80" />
				</Media>
				<Media className="mt-75 ml-1" body>
					<Button.Ripple tag={Label} className="mr-75" size="sm" color="primary">
						Upload
						<Input type="file" onChange={onChange} hidden accept="image/*" />
					</Button.Ripple>
					<Button.Ripple color="secondary" size="sm" outline>
						Reset
					</Button.Ripple>
					<p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
				</Media>
			</Media>
			<AvForm className="mt-2" onSubmit={onSubmit}>
				<Row>
					<Col sm="6">
						<FormGroup>
							<Label for="name">Name</Label>
							<AvInput id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="email">E-mail</Label>
							<AvInput id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="phone">Phone</Label>
							<AvInput type="phone" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="address">Address</Label>
							<AvInput id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address Name" required />
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="bankName">Bank Name</Label>
							<AvInput
								id="bankName"
								name="bankName"
								value={bankName}
								onChange={(e) => setBankName(e.target.value)}
								placeholder="Bank Name"
								required
							/>
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="bankAccountName">Account Name</Label>
							<AvInput
								id="bankAccountName"
								name="bankAccountName"
								value={accountName}
								onChange={(e) => setAccountName(e.target.value)}
								placeholder="Account Name"
								required
							/>
						</FormGroup>
					</Col>
					<Col sm="6">
						<FormGroup>
							<Label for="bankAccountNumber">Account Number</Label>
							<AvInput
								id="bankAccountNumber"
								name="bankAccountNumber"
								value={bankAccountNumber}
								onChange={(e) => setBankAccountNumber(e.target.value)}
								placeholder="Account Number"
								required
							/>
						</FormGroup>
					</Col>
					<Col className="mt-75" sm="12">
						<Alert className="mb-50" color="warning">
							<h4 className="alert-heading">Your email is not confirmed. Please check your inbox.</h4>
							<div className="alert-body">
								<a href="/" className="alert-link" onClick={(e) => e.preventDefault()}>
									Resend confirmation
								</a>
							</div>
						</Alert>
					</Col>
					<Col className="mt-2" sm="12">
						<Button.Ripple type="submit" className="mr-1" color="primary" disabled={isSubmitting}>
							{isSubmitting && <Spinner color="white" size="sm" />}
							<span className="ml-50">Submit</span>
						</Button.Ripple>
						{/* <Button.Ripple className='mr-1' color='primary'>
              Save changes
            </Button.Ripple>
            <Button.Ripple color='secondary' outline>
              Cancel
            </Button.Ripple> */}
					</Col>
				</Row>
			</AvForm>
		</Fragment>
	)
}

export default GeneralTabs
