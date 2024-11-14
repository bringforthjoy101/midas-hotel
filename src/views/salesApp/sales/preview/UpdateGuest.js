import { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Label, Input, Form } from 'reactstrap'
import { selectThemeColors, swal, apiRequest } from '@utils'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
	getSale,
	// updateStatus
} from '../store/action'
import Select from 'react-select'

export const UpdateGuest = ({hasGuest}) => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [modal, setModal] = useState(false)
	const [allGuest, setAllGuest] = useState([])
	const [selectedGuest, setSelectedGuest] = useState('')
	console.log({ selectedGuest })

	const toggleModal = () => {
		setModal(!modal)
	}

	useEffect(() => {
		apiRequest({ url: '/servers/get-guests', method: 'GET' }, dispatch).then((response) => {
			setAllGuest(response.data.data.filter((lodge) => !lodge.checkout).map((lodge) => { return { ...lodge.reservationDetail.guest, room: lodge.reservationDetail.room } }))
		})
	}, [])

	const onSubmit = async (event) => {
		event?.preventDefault()
		const form = event.target
		const userData = {
			guestId: selectedGuest.guestId,
			guestName: selectedGuest.label,
		}
		const body = JSON.stringify(userData)
		try {
			setIsSubmitting(true)
			const response = await apiRequest({ url: `/sales/update-guest-name/${id}`, method: 'POST', body }, dispatch)
			if (response) {
				if (response.data.status) {
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

	return (
		<>
			<Button.Ripple color="warning" onClick={toggleModal} outline block disabled={hasGuest && true}>
				Update Charged Guest 
			</Button.Ripple>
			<Modal isOpen={modal} toggle={toggleModal} className="modal-dialog-centered" modalClassName="modal-warning">
				<ModalHeader toggle={toggleModal}>Update Charged Guest</ModalHeader>
				<Form onSubmit={onSubmit}>
					<ModalBody>
						<div className="mb-1">
							<Label className="form-label" for="status">
								Select Guest Room
							</Label>
							<Select
								id="guest"
								name="guest"
								theme={selectThemeColors}
								className="react-select"
								classNamePrefix="select"
								defaultValue={selectedGuest}
								options={allGuest?.map((guest) => {
									return { value: guest.room.id, label: `${guest.fullName} (${guest.room.name})`, guestId: guest.id }
								})}
								isClearable={false}
								onChange={setSelectedGuest}
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

export default UpdateGuest
