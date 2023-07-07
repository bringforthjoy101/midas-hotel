// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Badge } from 'reactstrap'
import { Slack, User, Database, Edit } from 'react-feather'

// ** Renders Client Columns
const renderClient = (row) => {
	const stateNum = Math.floor(Math.random() * 6),
		states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
		color = states[stateNum]

	if (row.avatar) {
		return <Avatar className="mr-1" img={row.avatar} width="32" height="32" />
	} else {
		return <Avatar color={color || 'primary'} className="mr-1" content={row.fullName || 'Admin'} initials />
	}
}

// ** Renders Role Columns
const renderRole = (row) => {
	const roleObj = {
		customerSupport: {
			class: 'text-primary',
			icon: User,
		},
		superAdmin: {
			class: 'text-success',
			icon: Database,
		},
		controlAdmin: {
			class: 'text-info',
			icon: Edit,
		},
		admin: {
			class: 'text-danger',
			icon: Slack,
		},
	}

	const Icon = roleObj[row.role] ? roleObj[row.role].icon : User

	return (
		<span className="text-truncate text-capitalize align-middle">
			<Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : 'text-primary'} mr-50`} />
			{row.role}
		</span>
	)
}

const statusObj = {
	INACTIVE: 'light-warning',
	ACTIVE: 'light-success',
	SUSPENDED: 'light-danger',
}

export const columns = [
	{
		name: 'User',
		minWidth: '297px',
		selector: 'fullName',
		sortable: true,
		cell: (row) => (
			<div className="d-flex justify-content-left align-items-center">
				{renderClient(row)}
				<div className="d-flex flex-column">
					<Link to={`/users/view/${row.id}`} className="user-name text-truncate mb-0">
						<span className="font-weight-bold">{row.fullName}</span>
					</Link>
					<small className="text-truncate text-muted mb-0">{row.phone}</small>
				</div>
			</div>
		),
	},
	{
		name: 'Phone Number',
		minWidth: '320px',
		selector: 'phone',
		sortable: true,
		cell: (row) => row.phone,
	},
	{
		name: 'Role',
		minWidth: '172px',
		selector: 'role',
		sortable: true,
		cell: (row) => renderRole(row),
	},
	{
		name: 'Status',
		minWidth: '138px',
		selector: 'status',
		sortable: true,
		cell: (row) => (
			<Badge className="text-capitalize" color={statusObj[row.status]} pill>
				{row.status}
			</Badge>
		),
	},
]
