// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

// ** Table Columns
import { columns } from './columns'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Share, Printer, FileText } from 'react-feather'
import DataTable from 'react-data-table-component'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {Card,
	CardHeader,
	CardTitle,
	CardBody,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Table,
	Button, Label, Input, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, CustomInput, Row, Col } from 'reactstrap'

// ** Store & Actions
import { getSalesReport } from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import jsPDF from 'jspdf'
import 'jspdf-autotable'


const UserSalesSummary = () => {
	const dispatch = useDispatch()
	const store = useSelector((state) => state.users)

	const [searchTerm, setSearchTerm] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [picker, setPicker] = useState([new Date(), new Date()])

	const [modal, setModal] = useState(false)

	const toggleModal = () => {
		setModal(!modal)
	}

	useEffect(() => {
		dispatch(getSalesReport({ startDate: moment().format('L').split('/').join('-'), endDate: moment().format('L').split('/').join('-'), userId: store.selectedUser.id }))
	}, [dispatch])

	const handleRangeSearch = (date) => {
		const range = date.map((d) => new Date(d).getTime())
		setPicker(range)
		dispatch(
			getSalesReport({ startDate: moment(date[0]).format('L').split('/').join('-'), endDate: moment(date[1]).format('L').split('/').join('-'), userId: store.selectedUser.id })
		)
	}

	// ** Table data to render
	

	const printReport = (sampleData, startDate, endDate) => {
		console.log({ startDate, endDate })
		// const convertTimestampToDate = (timestamp) => {
		// 	const date = new Date(timestamp);
		// 	return date.toLocaleDateString();
		// };

		// sampleData.itemsSold.forEach(item => {
		// 	item.date = convertTimestampToDate(item.date);
		// });
		const printWindow = window.open('', '', 'width=302', 'height=800')
		printWindow.document.write('<html><head><title>Sales Report</title>')
		printWindow.document.write('<style>body { font-family: Courier, monospace; }</style>')
		printWindow.document.write('</head><body>')
		printWindow.document.write('<h2>MIDAS HOTELS</h2>')
		printWindow.document.write('<p>Address: 123 Midas Avenue, Iworoko RD, Ado Ekiti</p>')
		printWindow.document.write('<p>Contact: 08172044826, 08172044827</p>')
		printWindow.document.write(`<h3>Sales Report For ${store.selectedUser.fullName}</h3>`)
		printWindow.document.write(`<p>From: ${moment(new Date(picker[0])).format('LL')} To: ${moment(new Date(picker[1])).format('LL')}</p>`)
		printWindow.document.write('<table style="width:100%">')
		printWindow.document.write('<tr><th style="text-align: left;">Item</th><th style="text-align: left;">Quantity</th><th style="text-align: left;">Total Amount</th></tr>')
		sampleData.itemsSold.forEach(item => {
			printWindow.document.write(`<tr><td>${item.name}</td><td>${item.quantity}</td><td>${item.totalAmount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</td></tr>`)
		})
		printWindow.document.write('</table>')
		printWindow.document.write(`<p>Total Sales: ${sampleData.totalSales}</p>`)
		printWindow.document.write(`<p>Total Amount: ₦${sampleData.totalAmount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</p>`)
		printWindow.document.write('<h2>Sales Status</h2>')
		printWindow.document.write('<table style="width:100%">')
		printWindow.document.write('<tr><th style="text-align: left;">Status</th><th style="text-align: left;">Amount</th></tr>')
		Object.keys(sampleData.byStatus).forEach(status => {
			printWindow.document.write(`<tr><td>${status}</td><td>${sampleData.byStatus[status].toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</td></tr>`)
		})
		printWindow.document.write('</table>')

		printWindow.document.write('<h2>Payment Modes</h2>')
		printWindow.document.write('<table style="width:100%">')
		printWindow.document.write('<tr><th style="text-align: left;">Payment Mode</th><th style="text-align: left;">Amount</th></tr>')
		Object.keys(sampleData.byPaymentMode).forEach(mode => {
			printWindow.document.write(`<tr><td>${mode}</td><td>${sampleData.byPaymentMode[mode].toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</td></tr>`)
		})
		printWindow.document.write('</table>')
		printWindow.document.write('</body></html>')
		printWindow.document.close()
		printWindow.print()

	}

	const renderTable = () => {
		return store?.selectedUserSummary?.itemsSold?.map((product, key) => {
			console.log({product})
			return (
				<tr key={key}>
					<td>
						<span className="align-middle fw-bold">{product.name}</span>
					</td>
					<td>
						<span className="align-middle fw-bold">{product.quantity}</span>
					</td>
					<td>{`₦${product.totalAmount.toLocaleString()}`}</td>
				</tr>
			)
		})
	}

	return (
		<Card>
				<CardHeader>
					<CardTitle tag="h4">Search Filter</CardTitle>
				</CardHeader>
				<CardBody>
					<Row form className="mt-1 mb-50">
						<Col lg="4" md="6">
							<Label for="range-picker">Select Range</Label>
							<Flatpickr
								value={picker}
								id="range-picker"
								className="form-control"
								onChange={(date) => handleRangeSearch(date)}
								options={{
									mode: 'range',
									defaultDate: ['2020-02-01', '2020-02-15'],
								}}
							/>
						</Col>
						<Col
							lg="4"
							md="6"
							className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
						>
							<>
								<Button.Ripple color="primary" onClick={() => toggleModal()}>
									{' '}
									Show Summary{' '}
								</Button.Ripple>
							</>
							<Modal isOpen={modal} toggle={() => toggleModal()} className={'modal-dialog-centered modal-lg'} key={1}>
								<ModalHeader toggle={() => toggleModal()}>Report Summary For  {store.selectedUser.fullName} from {moment(new Date(picker[0])).format('LL')} To: {moment(new Date(picker[1])).format('LL')}</ModalHeader>
								<ModalBody>
									<Fragment>
										<Table bordered responsive>
											<thead>
											<tr>
												<th>Products</th>
												<th>Qty</th>
												<th>Sales</th>
											</tr>
											</thead>
											<tbody>
											{renderTable()}
											<tr key={'total'}>
												<td></td>
												<td>
													<span className="align-middle fw-bold"> TOTAL Sales </span>
												</td>
												<td>
													<h3 className="align-middle fw-bold"> {`${store?.selectedUserSummary?.totalSales?.toLocaleString()} Sales`} </h3>
												</td>
											</tr>
											<tr key={'total-amount'}>
												<td></td>
												<td>
													<span className="align-middle fw-bold"> TOTAL Sales Amount </span>
												</td>
												<td>
													<h3 className="align-middle fw-bold"> {`${store?.selectedUserSummary?.totalAmount?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}`} </h3>
												</td>
											</tr>
											<tr>
												<td colSpan="3" className="text-center fw-bold"><h2>STATUS</h2></td>
											</tr>
											{store?.selectedUserSummary && Object.keys(store?.selectedUserSummary?.byStatus).map((key) => {
												return (
													<tr key={key}>
														<td></td>
														<td>
															<span className="align-middle fw-bold"> {key} </span>
														</td>
														<td>
															<h3 className="align-middle fw-bold"> {`${store?.selectedUserSummary?.byStatus[key].toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}`} </h3>
														</td>
													</tr>
												)
											})}
											<tr>
												<td colSpan="3" className="text-center fw-bold"><h2>PAYMENTS</h2></td>
											</tr>
											{store?.selectedUserSummary && Object.keys(store?.selectedUserSummary?.byPaymentMode).map((key) => {
												return (
													<tr key={key}>
														<td></td>
														<td>
															<span className="align-middle fw-bold"> {key} </span>
														</td>
														<td>
															<h3 className="align-middle fw-bold"> {`${store?.selectedUserSummary?.byPaymentMode[key].toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}`} </h3>
														</td>
													</tr>
												)
											})}
											</tbody>
										</Table>
									</Fragment>
								</ModalBody>
								<ModalFooter>
									<Button color="secondary" onClick={() => toggleModal()} outline>
										Close
									</Button>
									<Button color="primary" onClick={() => printReport(store?.selectedUserSummary, picker[0], picker[1])} outline>
										Print Report
									</Button>
								</ModalFooter>
							</Modal>
						
						</Col>
					</Row>
				</CardBody>
			</Card>
	)
}

export default UserSalesSummary
