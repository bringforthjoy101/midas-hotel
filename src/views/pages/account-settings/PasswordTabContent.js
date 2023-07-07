import { useState } from 'react'
import { FormGroup, Row, Col, Button, Spinner } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import InputPhoneToggle from '@components/input-phone-toggle'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'
import { swal, apiRequest } from '@utils'
import { useDispatch } from 'react-redux'

const PasswordTabContent = () => {
	const dispatch = useDispatch()
	const phone = JSON.parse(localStorage.getItem('userData')).phone
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [userData, setUserData] = useState({
		oldPassword: '',
		newPassword: '',
		phone,
	})

	const onSubmit = async (event, errors) => {
		setIsSubmitting(true)
		event.preventDefault()
		// console.log({ errors })
		if (errors && !errors.length) {
			// console.log({ userData })
			setIsSubmitting(true)
			const body = JSON.stringify(userData)
			try {
				const response = await apiRequest({ url: '/change-password', method: 'POST', body }, dispatch)
				// console.log({ response })
				if (response.data.status) {
					setIsSubmitting(false)
					swal('Great job!', response.data.message, 'success')
					setUserData({
						oldPassword: '',
						newPassword: '',
						phone,
					})
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
		<AvForm onSubmit={onSubmit}>
			<Row>
				<Col sm="6">
					<FormGroup>
						<InputPasswordToggle
							tag={AvInput}
							className="input-group-merge"
							label="Old Password"
							htmlFor="oldPassword"
							name="oldPassword"
							required
							value={userData.oldPassword}
							onChange={(e) => setUserData({ ...userData, oldPassword: e.target.value })}
						/>
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col sm="6">
					<FormGroup>
						<InputPasswordToggle
							tag={AvInput}
							className="input-group-merge"
							label="New Password"
							htmlFor="new_password"
							name="new_password"
							required
							value={userData.newPassword}
							onChange={(e) => setUserData({ ...userData, newPassword: e.target.value })}
						/>
					</FormGroup>
				</Col>
				<Col sm="6">
					<FormGroup>
						<InputPhoneToggle
							tag={AvInput}
							className="input-group-merge"
							label="Phone"
							htmlFor="phone"
							name="phone"
							value={userData.phone}
							onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
						/>
					</FormGroup>
				</Col>
				<Col className="mt-1" sm="12">
					<Button.Ripple className="mr-1" color="primary" disabled={isSubmitting}>
						{isSubmitting && <Spinner color="white" size="sm" />}
						<span className="ml-50">Save Changes</span>
					</Button.Ripple>
					<Button.Ripple color="secondary" outline>
						Cancel
					</Button.Ripple>
				</Col>
			</Row>
		</AvForm>
	)
}

export default PasswordTabContent
