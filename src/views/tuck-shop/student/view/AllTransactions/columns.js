// ** React Imports
import moment from 'moment'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import {
  Send,
  CheckCircle,
  Save,
  ArrowDownCircle,
  Info,
  PieChart
} from 'react-feather'

const statusObj = {
  pending: 'light-warning',
  success: 'light-success',
  failed: 'light-danger'
}

// ** Table columns
export const columns = [
  {
    name: 'Transaction ID',
    minWidth: '100px',
    selector: 'transactionId',
    cell: row => <span>{ `#${row.transactionId}` }</span>
  },
  {
    name: 'Amount',
    selector: 'amount',
    sortable: true,
    minWidth: '100px',
    cell: row => <span>{(row.amount || 0).toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}</span>
  },
  {
    name: 'Balance',
    selector: 'balance',
    sortable: true,
    minWidth: '100px',
    cell: row => {
      return row.balance !== 0 ? (
        <span>{(row.balance || 0).toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}</span>
      ) : (
        <Badge color='light-danger' pill>
          Empty
        </Badge>
      )
    }
  },
  {
    name: 'Type',
    selector: 'type',
    sortable: true,
    minWidth: '80px',
    cell: row => <span className='text-capitalize'>{row.type}</span>
  },
  {
    name: 'Narration',
    selector: 'narration',
    sortable: true,
    minWidth: '80px',
    cell: row => <span>{row.narration}</span>
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '80px',
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status]} pill>
        {row.status}
      </Badge>
    )
  },
  {
    name: 'Date',
    selector: 'createdAt',
    sortable: true,
    minWidth: '80px',
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
