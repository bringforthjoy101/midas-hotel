// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import moment from 'moment'

// ** Store & Actions
import { getServer } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { isUserLoggedIn } from '@utils'

// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'
import UserTimeline from './UserTimeline'

// ** Styles
import '@styles/react/apps/app-users.scss'

const ServerView = (props) => {
	// ** Vars
	const store = useSelector((state) => state.servers),
		dispatch = useDispatch(),
		{ id } = useParams()

	const [userData, setUserData] = useState(null)

	useEffect(() => {
		if (isUserLoggedIn() !== null) {
			setUserData(JSON.parse(localStorage.getItem('userData')))
		}
	}, [])

	// ** Get User on mount
	useEffect(() => {
		dispatch(getServer(id))
	}, [dispatch])

	return store.selectedServer !== null && store.selectedServer !== undefined ? (
		<div className="app-user-view">
			<Row>
				<Col xl="9" lg="8" md="7">
					<UserInfoCard selectedServer={store.selectedServer} />
				</Col>
				{userData?.role === 'ADMIN' ? (
					<Col xl="3" lg="4" md="5">
						<PlanCard selectedServer={store.selectedServer} />
					</Col>
				) : (
					''
				)}
			</Row>
		</div>
	) : (
		''
	)
}
export default ServerView
