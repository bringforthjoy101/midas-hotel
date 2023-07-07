// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getSale } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap
import { Row, Col, Alert, Button } from 'reactstrap'

// ** User View Components
import UserInfoCard from './UserInfoCard'
import { isUserLoggedIn, apiRequest, swal } from '@utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const SaleView = (props) => {
	// ** Vars
	const store = useSelector((state) => state.appiaSale),
		dispatch = useDispatch(),
		{ id } = useParams()

	const [userData, setUserData] = useState(null)
	const [detail, setDetail] = useState(null)

	// ** Get user on mount
	useEffect(() => {
		dispatch(getSale(id))
	}, [dispatch])

	useEffect(() => {
		if (isUserLoggedIn() !== null) {
			setUserData(JSON.parse(localStorage.getItem('userData')))
		}
	}, [])

	return store.selectedSale !== null && store.selectedSale !== undefined ? (
		<div className="app-user-view">
			<Row>
				<Col xl="12" lg="12" md="12">
					<UserInfoCard selectedSale={store.selectedSale} detail={detail} />
				</Col>
			</Row>
		</div>
	) : (
		''
	)
}
export default SaleView
