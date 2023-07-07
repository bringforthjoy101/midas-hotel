// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import moment from 'moment'

// ** Third Party Components
import { Badge } from 'reactstrap'

// ** Renders Client Columns
const renderClient = (row) => {
	const stateNum = Math.floor(Math.random() * 6),
		states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
		color = states[stateNum]

	if (row?.avatar) {
		return <Avatar className="mr-1" img={row.avatar} width="32" height="32" />
	} else {
		return <Avatar color={color || 'primary'} className="mr-1" content={row.fullName || 'Client Name'} initials />
	}
}

const getItemNames = (items) => {
	const arr = []
	items.forEach((item) => {
		arr.push(item.name)
	})
	const string = arr.join(', ')
	if (string.length < 35) return string
	return `${string.substring(0, 35)}...`
}

const statusObj = {
	PAID: 'light-success',
	REVOKED: 'light-danger',
}

const modeObj = {
	CASH: 'light-success',
	REVOKED: 'light-danger',
}

export const columns = [
	{
		name: 'Sale Id',
		width: '150px',
		selector: 'saleNumber',
		sortable: true,
		cell: (row) => (
			<Link to={`/sales/preview/${row.id}`}>
				<span>#{row.saleNumber}</span>
			</Link>
		),
	},
	{
		name: 'Amount',
		width: '150px',
		selector: 'amount',
		sortable: true,
		cell: (row) => <span className="text-capitalize">{row?.amount?.toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}</span>,
	},
	// {
	//   name: 'Products ',
	//   minWidth: '150px',
	//   selector: 'products',
	//   sortable: true,
	//   cell: row => <span className="text-capitalize">{getItemNames(row.products)}</span>
	// },
	{
		name: 'Amount Paid',
		width: '150px',
		selector: 'amountPaid',
		sortable: true,
		cell: (row) => <span className="text-capitalize">{(row?.amountPaid || 0)?.toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}</span>,
	},
	{
		name: 'Status',
		width: '100px',
		selector: 'status',
		sortable: true,
		cell: (row) => (
			<Badge className="text-capitalize" color={statusObj[row.status]} pill>
				{row.status}
			</Badge>
		),
	},
	{
		name: 'Mode',
		width: '100px',
		selector: 'mode',
		sortable: true,
		cell: (row) => (
			<Badge className="text-capitalize" color={'light-primary'} pill>
				{row.mode}
			</Badge>
		),
	},
	{
		name: 'Order Date',
		minWidth: '150px',
		selector: 'createdAt',
		sortable: true,
		cell: (row) => moment(row.createdAt).format('lll'),
	},
	{
		name: 'Initiated By',
		minWidth: '200px',
		selector: 'admin',
		sortable: true,
		cell: (row) => (
			<div className="d-flex justify-content-left align-items-center">
				{renderClient(row.user)}
				<div className="d-flex flex-column">
					<Link to={`/users/view/${row.user.id}`} className="user-name text-truncate mb-0">
						<span className="font-weight-bold">{row.user.fullName}</span>
					</Link>
				</div>
			</div>
		),
	},
]
