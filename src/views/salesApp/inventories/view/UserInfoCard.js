// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Card, CardBody, CardText, Row, Col, Button } from 'reactstrap'
import moment from 'moment'

import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { deleteInventory, getAllData } from '../store/action'

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedInventory }) => {
	const renderImg = () => {
		if (selectedInventory !== null && selectedInventory.image) {
			return <img src={selectedInventory.image} alt="user-avatar" className="img-fluid rounded" height="104" width="104" />
		} else {
			const stateNum = Math.floor(Math.random() * 6),
				states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
				color = states[stateNum]
			return (
				<Avatar
					initials
					color={color}
					className="rounded"
					content={selectedInventory.name}
					contentStyles={{
						borderRadius: 0,
						fontSize: 'calc(36px)',
						width: '100%',
						height: '100%',
					}}
					style={{
						height: '90px',
						width: '90px',
					}}
				/>
			)
		}
	}
	const history = useHistory()
	const dispatch = useDispatch()

	// ** Handle Delete
	const handleDelete = async (id) => {
		return MySwal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ml-1',
			},
			buttonsStyling: false,
		}).then(async function (result) {
			if (result.value) {
				const deleted = await dispatch(deleteInventory(id))
				if (deleted) {
					await dispatch(getAllData())
					MySwal.fire({
						icon: 'success',
						title: 'Deleted!',
						text: 'Inventory has been deleted.',
						customClass: {
							confirmButton: 'btn btn-primary',
						},
					})
					history.push(`/inventories/list`)
				}
			}
		})
	}

	return (
		<Card>
			<CardBody>
				<Row>
					<Col xl="6" lg="12" className="d-flex flex-column justify-content-between border-container-lg">
						<div className="user-avatar-section">
							<h3>Inventory Details</h3>
							<div className="d-flex justify-content-start">
								{renderImg()}
								<div className="d-flex flex-column ml-1">
									<div className="user-info mt-1 mb-1">
										<h4 className="mb-0">{selectedInventory.name}</h4>
									</div>
									<div className="d-flex flex-wrap align-items-center">
										<Button.Ripple tag={Link} to={`/inventories/edit/${selectedInventory.id}`} color="primary">
											Edit
										</Button.Ripple>
										<Button.Ripple className="ml-1" color="danger" outline onClick={() => handleDelete(selectedInventory.id)}>
											Delete
										</Button.Ripple>
									</div>
								</div>
							</div>
							<div className="d-flex align-items-center mr-2 mt-1">
								{/* <div className='color-box'>
                  <span>Description: </span>
                </div> */}
								<div className="ml-0">
									<h6 className="mb-0">{selectedInventory.description || ''}</h6>
								</div>
							</div>
						</div>
					</Col>
					<Col xl="6" lg="12" className="d-flex flex-column justify-content-between border-container-lg">
						<div className="user-avatar-section">
							{/* <h3>Inventory Details</h3> */}
							<div className="d-flex align-items-center mr-2 mt-1">
								<div className="color-box">
									<span>Inventory Id: </span>
								</div>
								<div className="ml-1">
									<h6 className="mb-0">{selectedInventory.id}</h6>
								</div>
							</div>
							<div className="d-flex align-items-center mr-2 mt-1">
								<div className="color-box">
									<span>Inventory Qty: </span>
								</div>
								<div className="ml-1">
									<h6 className="mb-0">{selectedInventory.qty.toLocaleString()}</h6>
								</div>
							</div>
							<div className="d-flex align-items-center mr-2 mt-1">
								<div className="color-box">
									<span>Status: </span>
								</div>
								<div className="ml-1">
									<h6 className="mb-0">{selectedInventory.status}</h6>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</CardBody>
		</Card>
	)
}

export default UserInfoCard
