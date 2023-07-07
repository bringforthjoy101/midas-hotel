// ** Custom Components
import Sidebar from '@components/sidebar'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { swal, apiRequest } from '@utils'
import { getAllData, getFilteredData } from '../store/action'

// ** Third Party Components
import { Button, FormGroup, Label, Spinner, CustomInput } from 'reactstrap'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'

const SidebarNewInventories = ({ open, toggleSidebar }) => {
	const dispatch = useDispatch()

	const [inventoryData, setInventoryData] = useState({
		name: '',
		qty: '',
		// image: 'https://res.cloudinary.com/bringforthjoy/image/upload/v1621720743/INVESTA/appia_reward_image_placeholder_um7q6g.jpg'
	})

	const [isSubmitting, setIsSubmitting] = useState(false)

	// ** Function to handle form submit
	const onSubmit = async (event, errors) => {
		setIsSubmitting(true)
		event.preventDefault()
		if (errors) setIsSubmitting(false)
		if (errors && !errors.length) {
			setIsSubmitting(true)
			const body = JSON.stringify(inventoryData)
			try {
				const response = await apiRequest({ url: '/inventories/create', method: 'POST', body }, dispatch)
				if (response.data.status) {
					setIsSubmitting(false)
					swal('Great job!', response.data.message, 'success')
					dispatch(getAllData())
					setInventoryData({
						name: '',
						qty: '',
					})
					toggleSidebar()
				} else {
					setIsSubmitting(false)
					swal('Oops!', response.data.message, 'error')
					setInventoryData({
						name: '',
						qty: '',
					})
					toggleSidebar()
				}
			} catch (error) {
				setIsSubmitting(false)
				console.error({ error })
			}
		}
	}

	return (
		<Sidebar size="lg" open={open} title="New Inventory" headerClassName="mb-1" contentClassName="pt-0" toggleSidebar={toggleSidebar}>
			<AvForm onSubmit={onSubmit}>
				<FormGroup>
					<Label for="name">Inventory Name</Label>
					<AvInput
						name="name"
						id="name"
						placeholder="Inventory Name"
						value={inventoryData.name}
						onChange={(e) => setInventoryData({ ...inventoryData, name: e.target.value })}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label for="qty">Inventory Qty</Label>
					<AvInput
						type="number"
						name="qty"
						id="qty"
						placeholder="Inventory Qty"
						value={inventoryData.qty}
						onChange={(e) => setInventoryData({ ...inventoryData, qty: e.target.value })}
					/>
				</FormGroup>

				<Button type="submit" className="mr-1" color="primary" disabled={isSubmitting}>
					{isSubmitting && <Spinner color="white" size="sm" />}
					<span className="ml-50">Submit</span>
				</Button>
				<Button type="reset" color="secondary" outline onClick={toggleSidebar}>
					Cancel
				</Button>
			</AvForm>
		</Sidebar>
	)
}

export default SidebarNewInventories
