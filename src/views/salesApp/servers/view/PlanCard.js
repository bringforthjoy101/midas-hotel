import { useState } from 'react'
// ** Reactstrap
import { Card, CardHeader, CardBody, Badge, UncontrolledTooltip, Button } from 'reactstrap'

import { activateServer, deactivateServer } from '../store/action'
import { store } from '@store/storeConfig/store'

const PlanCard = ({ selectedServer }) => {
	// state
	const [toggleButton, setToggleButton] = useState(false)

	// ** Function to toggle sidebar
	const openButton = () => setToggleButton(!toggleButton)

	return (
		<Card className="plan-card border-primary">
			<CardHeader className="d-flex justify-content-between align-items-center pt-75 pb-1">
				<h5 className="mb-0">Actions</h5>
			</CardHeader>
			<CardBody>
				{selectedServer.status === 'ACTIVE' ? (
					<Button.Ripple
						className="text-center mb-1"
						color="danger"
						block
						onClick={() => {
							store.dispatch(deactivateServer(selectedServer.id))
						}}
					>
						{' '}
						Deactivate Server
					</Button.Ripple>
				) : (
					<Button.Ripple
						className="text-center mb-1"
						color="success"
						block
						onClick={() => {
							store.dispatch(activateServer(selectedServer.id))
						}}
					>
						Activate Server
					</Button.Ripple>
				)}
			</CardBody>
		</Card>
	)
}

export default PlanCard
