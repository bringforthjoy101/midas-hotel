import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import axios from 'axios'
import { Row, Col, Alert } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
// import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'
// import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment'

import { getSale } from '../store/action'

// ** Styles
import '@styles/base/pages/app-invoice.scss'

const InvoicePreview = () => {
	// ** Vars
	// const { id } = useParams()
	const store = useSelector((state) => state.sales),
		dispatch = useDispatch(),
		{ id } = useParams()

	// ** States
	const [data, setData] = useState(null)
	const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
	const [addPaymentOpen, setAddPaymentOpen] = useState(false)

	// ** Functions to toggle add & send sidebar
	const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
	const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen)

	// ** Get invoice on mount based on id
	useEffect(() => {
		// axios.get(`/api/invoice/invoices/${id}`).then(response => {
		//   setData(response.data)
		// })
		dispatch(getSale(id))
	}, [])

	const { selectedSale } = store

	return selectedSale !== null ? (
		<div className="invoice-preview-wrapper">
			<Row className="invoice-preview">
				<Col xl={9} md={8} sm={12}>
					<PreviewCard data={selectedSale} />
				</Col>
				<Col xl={3} md={4} sm={12}>
					<PreviewActions id={id} data={selectedSale} />
				</Col>
			</Row>
			{/* <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} /> */}
			{/* <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen} /> */}
		</div>
	) : (
		<Alert color="danger">
			<h4 className="alert-heading">Sales not found</h4>
			<div className="alert-body">
				Sales with id: {id} doesn't exist. Check list of all invoices: <Link to="/sales/list">Sales List</Link>
			</div>
		</Alert>
	)
}

export default InvoicePreview
