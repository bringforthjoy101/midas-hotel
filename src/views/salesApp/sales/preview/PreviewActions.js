// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import { Card, CardBody, Button } from 'reactstrap'
import UpdateStatus from './UpdateStatus'
import { swal, apiRequest } from '@utils'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch } from 'react-redux'
import { getSale, completeSale, nullifySale } from '../store/action'
import UpdateGuest from './UpdateGuest'

const PreviewActions = ({ id, data }) => {
	const dispatch = useDispatch()
	const MySwal = withReactContent(Swal)

	const completePayment = async (saleId) => {
		const response = await apiRequest({ url: `/sales/complete/${saleId}`, method: 'GET' }, dispatch)
		if (response) {
			if (response.data.message) {
				swal('Great job!', response.data.message, 'success')
				dispatch(getSale(id))
			} else {
				swal('Oops!', response.data.message, 'error')
			}
		} else {
			swal('Oops!', 'Something went wrong with your network.', 'error')
		}
	}

	const handleCompleteSale = async (id) => {
        return MySwal.fire({
          title: 'Are you sure?',
          text: "This action will complete this order!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, complete it!',
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-outline-danger ml-1'
          },
          buttonsStyling: false
        }).then(async function (result) {
          if (result.value) {
            const completed = await dispatch(completeSale(id))
            if (completed) {
              await dispatch(getSale(id))
                MySwal.fire({
                    icon: 'success',
                    title: 'Comleted!',
                    text: 'Sales has been completed.',
                    customClass: {
                      confirmButton: 'btn btn-primary'
                    }
                  })
            //   history.push(`/products/list`)
            }
            
          }
        })
  	}

	  const handleNullifySale = async (id) => {
        return MySwal.fire({
          title: 'Are you sure?',
          text: "This action will cancelled this sale!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, cancel it!',
          customClass: {
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-outline-danger ml-1'
          },
          buttonsStyling: false
        }).then(async function (result) {
          if (result.value) {
            const nullified = await dispatch(nullifySale(id))
            if (nullified) {
              await dispatch(getSale(id))
                MySwal.fire({
                    icon: 'success',
                    title: 'Cancelled!',
                    text: 'Sale has been cancelled.',
                    customClass: {
                      confirmButton: 'btn btn-primary'
                    }
                  })
            //   history.push(`/products/list`)
            }
            
          }
        })
  	}
	return (
		<Card className="invoice-action-wrapper">
			<CardBody>
				{/* <Button.Ripple color='primary' block className='mb-75' onClick={() => setSendSidebarOpen(true)}>
          Send Invoice
        </Button.Ripple> */}

				<Button.Ripple color="secondary" tag={Link} to={`/sales/print/${id}`} block outline className="mb-75">
					Print
				</Button.Ripple>
				<Button.Ripple className="mb-75" color='success' onClick={() => handleCompleteSale(data.id)} block disabled={data.status !== 'DRAFT'}>
					Complete Sale
				</Button.Ripple>
				<Button.Ripple className='mb-75' color='danger' outline onClick={() => handleNullifySale(data.id)} block disabled={data.status !== 'DRAFT'}>
					Cancel Sale
				</Button.Ripple>
				<UpdateStatus saleCompleted={data.status === 'COMPLETED'} />
				<UpdateGuest hasGuest={data.guestName} />
				{/* <Button.Ripple tag={Link} to={`/apps/invoice/edit/${id}`} color='secondary' block outline className='mb-75'>
          Edit
        </Button.Ripple>
        <Button.Ripple color='success' block onClick={() => setAddPaymentOpen(true)}>
          Add Payment
        </Button.Ripple> */}
			</CardBody>
		</Card>
	)
}

export default PreviewActions
