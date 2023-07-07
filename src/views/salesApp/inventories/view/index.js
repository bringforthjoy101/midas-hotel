// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getInventory } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap
import { Row, Col, Alert, Button } from 'reactstrap'

// ** User View Components
import UserInfoCard from './UserInfoCard'
import PlanCard from './PlanCard'
import { isUserLoggedIn, apiRequest, swal } from '@utils'

import InventoryHistories from './InventoryHistories'

// ** Styles
import '@styles/react/apps/app-users.scss'

const InventoryView = (props) => {
	// ** Vars
	const store = useSelector((state) => state.inventories),
		dispatch = useDispatch(),
		{ id } = useParams()

	const [userData, setUserData] = useState(null)
	const [detail, setDetail] = useState(null)

	// ** Get user on mount
	useEffect(() => {
		dispatch(getInventory(id))
	}, [dispatch])

	useEffect(() => {
		if (isUserLoggedIn() !== null) {
			setUserData(JSON.parse(localStorage.getItem('userData')))
		}
	}, [])

	return store.selectedInventory !== null && store.selectedInventory !== undefined ? (
		<div className="app-user-view">
			<Row>
				<Col xl="9" lg="9" md="12">
					<UserInfoCard selectedInventory={store.selectedInventory} detail={detail} />
				</Col>
				<Col xl="3" lg="3" md="12">
					<PlanCard selectedInventory={store.selectedInventory} detail={detail} />
				</Col>
			</Row>
			<Row>
				<Col sm="12">
					<InventoryHistories />
				</Col>
			</Row>
		</div>
	) : (
		''
	)
}
export default InventoryView
