// ** React Imports
import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// ** Third Party Components
import classnames from 'classnames'
import { X, Heart, Star } from 'react-feather'
import Select from 'react-select'
import { Card, CardBody, CardText, Button, Badge, FormGroup, Label, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap'
import { AvForm, AvInput } from 'availity-reactstrap-validation-safe'
import { swal, apiRequest, selectThemeColors } from '@utils'

// ** Custom Components
import NumberInput from '@components/number-input'
import { getAllData } from '../../../student/store/action'
import { deleteAllCartItem } from '../../store/actions'

const Cart = props => {
  // ** Props
  const { products, stepper, deleteCartItem, dispatch, addToWishlist, deleteWishlistItem, getCartItems } = props

  const history = useHistory()

  // ** Function to convert Date
  const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
    if (!value) return value
    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
  }

  // ** Funciton Function to toggle wishlist item
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getCartItems())
  }

  // ** Render cart items
  const renderCart = () => {
    return products.map(item => {
      return (
        <Card key={item.name} className='ecommerce-card'>
          <div className='item-img'>
            <Link to={`/apps/ecommerce/product/${item.id}`}>
              <img className='img-fluid' src={item.image} alt={item.name} />
            </Link>
          </div>
          <CardBody>
            <div className='item-name'>
              <h6 className='mb-0'>
                <Link to={`/apps/ecommerce/product/${item.id}`}>{item.name}</Link>
              </h6>
              {/* <span className='item-company'>
                By
                <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
                  {item.brand}
                </a>
              </span> */}
              <div className='item-rating'>
                <ul className='unstyled-list list-inline'>
                  {new Array(5).fill().map((listItem, index) => {
                    return (
                      <li key={index} className='ratings-list-item mr-25'>
                        <Star
                          className={classnames({
                            'filled-star': index + 1 <= item.rating,
                            'unfilled-star': index + 1 > item.rating
                          })}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            {/* <span className='text-success mb-1'>In Stock</span> */}
            <div className='item-quantity'>
              <span className='quantity-title mr-50'>Qty</span>
              <NumberInput value={item.qty} min={1} dispatch={dispatch} productId={item.id} size='sm' style={{ width: '7rem', height: '2.15rem' }} />
            </div>
            {/* <div className='delivery-date text-muted'>Delivery by, {formatDate(item.shippingDate)}</div>
            <span className='text-success'>
              {item.discountPercentage}% off {item.offers} offers Available
            </span> */}
          </CardBody>
          <div className='item-options text-center'>
            <div className='item-wrapper'>
              <div className='item-cost'>
                <h4 className='item-price'>₦{(item.price * item.qty).toLocaleString()}</h4>
                {item.hasFreeShipping ? (
                  <CardText className='shipping'>
                    <Badge color='light-success' pill>
                      Free Shipping
                    </Badge>
                  </CardText>
                ) : null}
              </div>
            </div>
            <Button className='mt-1 remove-wishlist' color='light' onClick={() => dispatch(deleteCartItem(item.id))}>
              <X size={14} className='mr-25' />
              <span>Remove</span>
            </Button>
            {/* <Button
              className='btn-cart'
              color='primary'
              onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
            >
              <Heart
                size={14}
                className={classnames('mr-25', {
                  'fill-current': item.isInWishlist
                })}
              />
              <span className='text-truncate'>Wishlist</span>
            </Button> */}
          </div>
        </Card>
      )
    })
  }

  const amount = products.reduce((n, {amount}) => n + amount, 0)
  const [selectedOption, setSelectedOption] = useState('')
  const [orderData, setOrderData] = useState({
    amount,
    products,
    studentId: selectedOption
  })
  

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData(JSON.parse(localStorage.getItem('userData')).role))
    setOrderData({...orderData, studentId: selectedOption.value})
  }, [dispatch, selectedOption])

  const store = useSelector(state => state.students)

  const renderStudents = (students) => {
    console.log(students)
    return students.map(student => {
      return {value: student.id, label: `${student.firstName} ${student.lastName} ${student.otherName} (₦${student.wallet.toLocaleString()})`}
    })
  }
  
  // ** Function to handle form submit
  const onSubmit = async (event, errors) => {
    event.preventDefault()
    console.log({errors})
    if (errors && !errors.length) {
      console.log({orderData})
      const body = JSON.stringify(orderData)
      try {
        const response = await apiRequest({url:'/orders/create', method:'POST', body}, dispatch)
        console.log({response})
        if (response.data.status) {
            swal('Great job!', response.data.message, 'success')
            dispatch(getAllData())
            dispatch(deleteAllCartItem())
            setOrderData({
              amount,
              products,
              studentId: selectedOption?.value
            })
            history.push(`/apps/ecommerce/shop`)
        } else {
          swal('Oops!', response.data.message, 'error')
          dispatch(deleteAllCartItem())
          setOrderData({
            amount,
            products,
            studentId: selectedOption?.value
          })
          history.push(`/apps/ecommerce/shop`)
        }
      } catch (error) {
        console.error({error})
      }
    }
  }

  return (
    <div className='list-view product-checkout'>
      <div className='checkout-items'>{products.length ? renderCart() : <h4>Your cart is empty</h4>}</div>
      <div className='checkout-options'>
        <Card>
          <CardBody>
            <AvForm onSubmit={onSubmit}>
              <FormGroup>
                <Label for='studentId'>Student</Label>
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={selectedOption}
                  options={renderStudents(store.allData)}
                  isClearable={false}
                  // value={orderData.studentId}
                  onChange={setSelectedOption}
                />
                {/* <AvInput 
                  type='select' 
                  id='studentId' 
                  name='studentId' 
                  value={orderData.studentId}
                  onChange={e => setOrderData({...orderData, studentId: e.target.value})}
                  required
                >
                  <option value=''>Select Student</option>
                  {renderStudents(store.allData)}
                </AvInput> */}
              </FormGroup> 
            
              <hr />
              <div className='price-details'>
                <ul className='list-unstyled'>
                  <li className='price-detail'>
                    <div className='detail-title detail-total'>Total</div>
                    <div className='detail-amt font-weight-bolder'>₦{amount.toLocaleString()}</div>
                  </li>
                </ul>
                <Button.Ripple
                  color='primary'
                  classnames='btn-next place-order'
                  block
                  type='submit'
                  // disabled={!products.length}
                  // onClick={onSubmit}
                >
                  Place Order
                </Button.Ripple>
              </div>
            </AvForm>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Cart
