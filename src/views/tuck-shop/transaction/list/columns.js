// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import moment from 'moment'

import { Badge } from 'reactstrap'


// ** Third Party Components

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (row.avatar) {
    return <Avatar className='mr-1' img={row.avatar} width='32' height='32' />
  } else {
    return <Avatar color={color || 'primary'} className='mr-1' content={`${row.trans_id}` || 'John Doe'} initials />
  }
}

const statusObj = {
  pending: 'light-warning',
  success: 'light-success',
  failed: 'light-danger'
}

export const columns = [
  {
    name: 'Transaction Id',
    minWidth: '150px',
    selector: 'transactionId',
    sortable: true,
    cell: row => row.transactionId
  },
  {
    name: 'Student',
    minWidth: '250px',
    selector: 'student',
    sortable: true,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row.student)}
        <div className='d-flex flex-column'>
          <Link
            to={`/student/view/${row.studentId}`}
            className='user-name text-truncate mb-0'
          >
            <span className='font-weight-bold'>{row.student.firstName} {row.student.lastName}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'Amount',
    minWidth: '150px',
    selector: 'amount',
    sortable: true,
    cell: row => <span>{(row.amount || 0).toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}</span>
  },
  {
    name: 'Balance',
    minWidth: '150px',
    selector: 'balance',
    sortable: true,
    cell: row => <span className="text-capitalize">{row?.balance?.toLocaleString('en-US', {style: 'currency', currency: 'NGN'})}</span>
  },
  {
    name: 'Status',
    minWidth: '100px',
    selector: 'status',
    sortable: true,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status]} pill>
        {row.status}
      </Badge>
    )
  },
  {
    name: 'Transaction Date',
    minWidth: '150px',
    selector: 'createdAt',
    sortable: true,
    cell: row => moment(row.createdAt).format('lll')
  },
  {
    name: 'Initiated By',
    minWidth: '200px',
    selector: 'admin',
    sortable: true,
    cell: row => <span className='font-weight-bold'>{row.admin.firstName} {row.admin.lastName}</span>
  }
]
