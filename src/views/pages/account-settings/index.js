import { Fragment, useState, useEffect } from 'react'
import Tabs from './Tabs'
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs'
import GeneralTabContent from './GeneralTabContent'
import MyProfile from './MyProfile'
import PasswordTabContent from './PasswordTabContent'
import ResetPassword from './ResetPassword'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
	const [activeTab, setActiveTab] = useState('1'),
		[data, setData] = useState(null)

	const toggleTab = (tab) => {
		setActiveTab(tab)
	}

	useEffect(() => {
		axios.get('/account-setting/data').then((response) => setData(response.data))
		setData(JSON.parse(localStorage.getItem('userData')))
	}, [])

	// console.log('dataa', JSON.parse(localStorage.getItem('userData')))

	return (
		<Fragment>
			<Breadcrumbs breadCrumbTitle="Account Settings" breadCrumbParent="Pages" breadCrumbActive="Account Settings" />
			<Row>
				<Col className="mb-2 mb-md-0" md="3">
					<Tabs activeTab={activeTab} toggleTab={toggleTab} />
				</Col>
				<Col md="9">
					<Card>
						<CardBody>
							<TabContent activeTab={activeTab}>
								{/* <TabPane tabId="1"><GeneralTabContent data={JSON.parse(localStorage.getItem('userData')).business} /></TabPane> */}
								<TabPane tabId="1">
									<PasswordTabContent />
								</TabPane>
								<TabPane tabId="2">
									<MyProfile data={JSON.parse(localStorage.getItem('userData'))} />
								</TabPane>
							</TabContent>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Fragment>
	)
}

export default AccountSettings
