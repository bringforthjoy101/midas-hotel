// ** Custom Components
import Sidebar from '@components/sidebar'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { swal, apiRequest } from '@utils'
import { getAllData, getFilteredData } from '../store/action'

// ** Third Party Components
import { Button, FormGroup, Label, FormText } from 'reactstrap'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'

const SidebarNewServers = ({ open, toggleSidebar }) => {
	const dispatch = useDispatch()

	const [serverData, setServerData] = useState({
		fullName: '',
		phone: '',
	})
	// ** Function to handle form submit
	const onSubmit = async (event, errors) => {
		event?.preventDefault()
		if (errors && !errors.length) {
			const body = JSON.stringify(serverData)
			try {
				const response = await apiRequest({ url: '/servers/create', method: 'POST', body }, dispatch)
				if (response) {
					if (response.data.status) {
						swal('Great job!', response.data.message, 'success')
						dispatch(getAllData())
						setServerData({
							fullName: '',
							phone: '',
						})
						toggleSidebar()
					} else {
						setServerData({
							fullName: '',
							phone: '',
						})
						swal('Oops!', response.data.message, 'error')
					}
				} else {
					swal('Oops!', 'Something went wrong with your network.', 'error')
				}
			} catch (error) {
				console.error({ error })
			}
		}
	}

	useEffect(() => {
		onSubmit()
		dispatch(getAllData())
	}, [dispatch])

	return (
		<Sidebar size="lg" open={open} title="New User" headerClassName="mb-1" contentClassName="pt-0" toggleSidebar={toggleSidebar}>
			<AvForm onSubmit={onSubmit}>
				<FormGroup>
					<Label for="fullName">Full Name</Label>
					<AvInput
						name="fullName"
						id="fullName"
						placeholder="Full Name"
						value={serverData.fullName}
						onChange={(e) => setServerData({ ...serverData, fullName: e.target.value })}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label for="phone">Phone</Label>
					<AvInput
						name="phone"
						id="phone"
						placeholder="08012345678"
						value={serverData.phone}
						onChange={(e) => setServerData({ ...serverData, phone: e.target.value })}
						required
					/>
				</FormGroup>
				<Button type="submit" className="mr-1" color="primary">
					Submit
				</Button>
				<Button type="reset" color="secondary" outline onClick={toggleSidebar}>
					Cancel
				</Button>
			</AvForm>
		</Sidebar>
	)
}

export default SidebarNewServers
