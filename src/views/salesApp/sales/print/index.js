// ** React Imports
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { getSale } from '../store/action'

// ** Third Party Components
import { Row, Col, Table, Media, Badge } from 'reactstrap'

// ** Styles
import '@styles/base/pages/app-invoice-print.scss'

const Print = () => {
	// ** Print on mount
	// useEffect(() => window.print(), [])
	const store = useSelector((state) => state.sales),
		dispatch = useDispatch(),
		{ id } = useParams()

	useEffect(() => {
		// axios.get(`/api/invoice/invoices/${id}`).then(response => {
		//   setData(response.data)
		// })
		dispatch(getSale(id))
		// setTimeout(window.print(), 10000)
		// window.print()
	}, [])

	const { selectedSale } = store

	const renderTable = (products) => {
		// products = process.env.NODE_ENV === 'production' ? JSON.parse(products) : products
		return products.map((product) => {
			return (
				<tr key={product.id}>
					<td className="ml-0 mr-0">
						<p className="card-text font-weight-bold mb-25">{product.name}</p>
					</td>
					<td className="">
						<span className="font-weight-bold">₦{product.price.toLocaleString()}</span>
					</td>
					<td className="">
						<span className="font-weight-bold">{product.qty.toLocaleString()}</span>
					</td>
					<td className="">
						<span className="font-weight-bold">₦{product.total.toLocaleString()}</span>
					</td>
				</tr>
			)
		})
	}

	const statusObj = {
		pending: 'light-warning',
		delivered: 'light-success',
	}

	return (
		<div className="invoice-print" style={{ color: 'black' }}>
			<div className="row ml-1" style={{ width: '302px' }}>
				{/* <div className='col-md-3'> */}
				<div className="d-flex justify-content-between flex-md-row flex-column pb-2">
					<div>
						<div className="d-flex mb-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<h4 className="text-right mb-1" style={{ color: '#000000' }}>
								WHITE ROCK
							</h4>
							{/*<Media className="mr-25" center>*/}
							{/*	<Media*/}
							{/*		object*/}
							{/*		className="rounded mr-50"*/}
							{/*		src={'https://res.cloudinary.com/bringforthjoy/image/upload/v1661904167/house178_fyddgi.jpg'}*/}
							{/*		alt="Generic placeholder image"*/}
							{/*		height="80"*/}
							{/*	/>*/}
							{/*</Media>*/}
						</div>
						{/* <p className="mb-25">{selectedSale?.business?.name || ''}</p>
						<p className="mb-25">{selectedSale?.business?.address || ''}</p>
						<p className="mb-0">+{selectedSale?.business?.phone || ''}</p> */}
					</div>
					<div className="mt-md-0 mt-2">
						<h4 className="text-right mb-1" style={{ color: '#000000' }}>
							RECEIPT #{selectedSale?.saleNumber}
						</h4>
						<div className="invoice-date-wrapper mb-50">
							<span className="invoice-date-title">Date:</span>
							<span className="font-weight-bold"> {moment(selectedSale?.createdAt).format('ll')}</span>
						</div>
						{/* <div className="invoice-date-wrapper">
							<span className="invoice-date-title">Due Date:</span>
							<span className="font-weight-bold">{moment(selectedSale?.createdAt).format('LL')}</span>
						</div> */}
						<div className="invoice-date-wrapper">
							<span className="invoice-date-title">Amount Paid:</span>
							<span className="invoice-date">₦{selectedSale?.amountPaid.toLocaleString()}</span>
						</div>
						<div className="invoice-date-wrapper">
							<span className="invoice-date-title">Balance:</span>
							<span className="invoice-date">₦{selectedSale?.balance.toLocaleString()}</span>
						</div>
						{/* <div className="invoice-date-wrapper">
							<span className="invoice-date-title">Status:</span>
							<span className="invoice-date">
								<Badge className="text-capitalize" color={statusObj[selectedSale?.saleStatus]} pill>
									{selectedSale?.saleStatus}
								</Badge>
							</span>
						</div> */}
					</div>
				</div>

				<hr className="my-2" />

				<Table className="mt-2 mb-0 mr-2" size="100">
					<thead>
						<tr>
							<th className="">Product</th>
							<th className="">Price</th>
							<th className="">Qty</th>
							<th className="">Total</th>
						</tr>
					</thead>
					<tbody>{renderTable(selectedSale?.products)}</tbody>
				</Table>

				<Row className="invoice-sales-total-wrapper mt-3">
					<Col className="justify-content-end" md="6">
						<div className="invoice-total-wrapper">
							<div className="invoice-total-item">
								<p className="invoice-total-title">Subtotal:</p>
								<p className="invoice-total-amount">₦{selectedSale?.subTotal.toLocaleString()}</p>
							</div>
							<div className="invoice-total-item">
								<p className="invoice-total-title">Discount:</p>
								<p className="invoice-total-amount">₦{selectedSale?.discount.toLocaleString()}</p>
							</div>
							<hr className="my-50" />
							<div className="invoice-total-item">
								<p className="invoice-total-title">Total:</p>
								<p className="invoice-total-amount">₦{selectedSale?.amountPaid.toLocaleString()}</p>
							</div>
						</div>
					</Col>
					<Col className="mt-md-0 mt-3" md="6">
						<p className="mb-0">
							<span className="font-weight-bold">Waiter:</span> <span className="ml-75">{selectedSale?.server.fullName}</span>
						</p>
					</Col>
				</Row>

				<hr className="my-2" />

				<Row>
					<Col sm="12">
						<span className="font-weight-bold">Note:</span>
						<span>Thank you for your patronage, We hope to see you again.</span>
					</Col>
				</Row>
				{/* </div> */}
				{/* <div className='col-md-9'></div> */}
			</div>
		</div>
	)
}

export default Print
