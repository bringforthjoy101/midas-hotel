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

const getItemNames = items => {
  const arr = []
  JSON.parse(items).forEach(item => {
    arr.push(item.name)
  })
  return arr.join(', ')
}

// ** Table columns
export const columns = [
  // {
  //   name: 'ID',
  //   minWidth: '180px',
  //   selector: 'id',
  //   cell: row => <span>{ `#${row.id}` }</span>
  // },
  {
    name: 'Book',
    selector: 'name',
    sortable: true,
    minWidth: '150px',
    cell: row => <span className='text-capitalize'>{row.name}</span>
  },
  {
    name: 'Qty',
    selector: 'qty',
    sortable: true,
    minWidth: '150px',
    cell: row => <span className='text-capitalize'>{row.qty}</span>
  },
  {
    name: 'Date',
    selector: 'shippingDate',
    sortable: true,
    minWidth: '200px',
    cell: row => moment(row.shippingDate).format('lll')
  },
  {
    name: 'Initiated By',
    minWidth: '200px',
    selector: 'admin',
    sortable: true,
    cell: row => <span className='font-weight-bold'>{row.admin.firstName} {row.admin.lastName}</span>
  }
]
