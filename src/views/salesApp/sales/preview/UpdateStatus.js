import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Label, Input, Form } from 'reactstrap'
import { selectThemeColors, swal, apiRequest } from '@utils'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
	getSale,
	// updateStatus
} from '../store/action'
import Select from 'react-select'

export const UpdateStatus = ({saleCompleted}) => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [modal, setModal] = useState(false)

	const toggleModal = () => {
		setModal(!modal)
	}

	const onSubmit = async (event) => {
		event?.preventDefault()
		const form = event.target
		const userData = {
			mode: form.mode.value,
		}
		const body = JSON.stringify(userData)
		try {
			setIsSubmitting(true)
			const response = await apiRequest({ url: `/sales/update-payment-mode/${id}`, method: 'POST', body }, dispatch)
			if (response) {
				if (response.data.message) {
					swal('Great job!', response.data.message, 'success')
					dispatch(getSale(id))
					setIsSubmitting(false)
				} else {
					swal('Oops!', response.data.message, 'error')
				}
			} else {
				swal('Oops!', 'Something went wrong with your network.', 'error')
			}
			toggleModal()
		} catch (error) {
			console.error({ error })
		}
	}

	const ModeOptions = [
		{ value: '', label: 'Select Payment Mode' },
		{ value: 'CASH', label: 'CASH' },
		{ value: 'POS_MONIEPOINT', label: 'POS - MONIEPOINT' },
		{ value: 'POS_FIDELITY', label: 'POS - FIDELITY' },
		{ value: 'TRANSFER', label: 'BANK TRANSFER' },
		{ value: 'COMPLEMENTARY', label: 'COMPLEMENTARY' },
		{ value: 'GUEST', label: 'GUEST' },
	]

	return (
		<>
			<Button.Ripple className='mb-75' color="primary" onClick={toggleModal} outline block disabled={saleCompleted && true}>
				Update Payment Mode
			</Button.Ripple>
			<Modal isOpen={modal} toggle={toggleModal} className="modal-dialog-centered" modalClassName="modal-primary">
				<ModalHeader toggle={toggleModal}>Update Payment Mode</ModalHeader>
				<Form onSubmit={onSubmit}>
					<ModalBody>
						<div className="mb-1">
							<Label className="form-label" for="status">
								Payment Mode
							</Label>
							<Select
								id="mode"
								name="mode"
								theme={selectThemeColors}
								className="react-select"
								classNamePrefix="select"
								options={ModeOptions}
								isClearable={false}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button className="me-1" color="primary" disabled={isSubmitting}>
							{isSubmitting && <Spinner color="white" size="sm" />}
							Update
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		</>
	)
}

export default UpdateStatus
