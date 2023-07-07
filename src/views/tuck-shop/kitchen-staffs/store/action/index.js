import { paginateArray, sortCompare, apiRequest, swal } from '@utils'
import moment from 'moment'

export const apiUrl = process.env.REACT_APP_API_ENDPOINT

// ** Get all User Data
export const getAllData = () => {
  return async dispatch => {
    // const url = role === 'store' ? '/students/kitchen' : '/students'
    const response = await apiRequest({ url: '/students/kitchen', method: 'GET' }, dispatch)
    if (response && response.data.data && response.data.status) {
      await dispatch({
        type: 'GET_ALL_KITCHEN_STAFF_DATA',
        data: response.data.data
      })
    } else {
      console.log(response)
      swal('Oops!', 'Something went wrong.', 'error')
    }
  }
}

// All Users Filtered Data
export const getFilteredData = (students, params) => {
  return async dispatch => {
    const { q = '', perPage = 10, number = '', page = 1, status = null, className = null, level = null, group = null } = params

    /* eslint-disable  */
    const queryLowered = q.toLowerCase()
    const filteredData = students.filter(
      student =>
        (student.otherName.toLowerCase().includes(queryLowered) || student.firstName.toLowerCase().includes(queryLowered) || student.lastName?.toString().toLowerCase().includes(queryLowered) || student.type.toLowerCase().includes(queryLowered)) &&
        student.class === (className || student.class) && student.level === (level || student.level) && student.group === (group || student.group) && student.status === (status || student.status)
    )

    /* eslint-enable  */

    dispatch({
      type: 'GET_FILTERED_KITCHEN_STAFF_DATA',
      data: paginateArray(filteredData, perPage, page),
      totalPages: filteredData.length,
      params
    })
  }
}

// get user details
export const getStudentDetails =  (id) => {
  return async dispatch => {
    const response = await apiRequest({ url: `/students/get-detail/${id}`, method: 'GET' }, dispatch)
    console.log(response)
    if (response && response.data && response.data.status) {
      await dispatch({
        type: 'GET_KITCHEN_STAFF_DETAILS',
        studentDetails: response.data.data
      })
    } else {
      console.log(response)
      swal('Oops!', 'Something went wrong.', 'error')
    }
  }
}

// Add Funds
export const creditOrDebitStudentWallet = ({studentId, narration, amount, type}) => {
  return async dispatch => {
    const body = JSON.stringify({studentId, narration, amount, type})
    const response = await apiRequest({url:`/students/wallet`, method:'POST', body}, dispatch)
    console.log({response})
    if (response && response.data.status) {
      swal('Good!', `Funds of ${amount} was successfully ${type === 'credit' ? 'added' : 'deducted'}!.`, 'success')
    } else {
      console.log(response)
      swal('Oops!', 'Somthing went wrong with your network.', 'error')
    }
  }
}

// Delete Student
export const deleteStudent = (studentId) => {
  return async dispatch => {
    const response = await apiRequest({url:`/students/delete/${studentId}`, method:'GET'}, dispatch)
    if (response && response.data.status) {
        return response.data
    } else {
      console.log(response)
      swal('Oops!', 'Something went wrong.', 'error')
    }
  }
}


// ALl Transactions
export const getUserAllTransactions = (user_id) => {
  return async dispatch => {
    const body = JSON.stringify({ user_id })
    const response = await apiRequest({ url: '/admin/users/transactions/all', method: 'POST', body }, dispatch)
    if (response && response.data.data && response.data.success) {
      await dispatch({
        type: 'GET_KITCHEN_STAFF_ALL_TRANSACTIONS',
        data: response.data.data
      })
    } else {
      console.log(response)
      swal('Oops!', 'Somthing went wrong with your network.', 'error')
    }
  }
}

// Filtered Transactions
export const getFilteredUserTransactions = (userTransactions, params) => {
  return async dispatch => {
    const { q = '', perPage = 10, page = 1 } = params
    /* eslint-enable */

    const queryLowered = q?.toLowerCase()
    const filteredData = userTransactions?.filter(
      transaction => (transaction?.transactionId?.toLowerCase()?.includes(queryLowered) || moment(transaction.createdAt).format('lll')?.toLowerCase()?.includes(queryLowered)))
    /* eslint-enable  */
    await dispatch({
      type: 'GET_KITCHEN_STAFF_TRANSACTIONS',
      data: paginateArray(filteredData, perPage, page),
      totalPages: filteredData.length,
      params
    })
  }
}

// Utilities Transactions
export const getUserAllUtilitiesTransactions = (user_id) => {
  return async dispatch => {
    const body = JSON.stringify({ user_id })
    const response = await apiRequest({ url: '/admin/users/transactions/utility', method: 'POST', body }, dispatch)
    if (response && response.data.data && response.data.success) {
      await dispatch({
        type: 'GET_KITCHEN_STAFF_ALL_UTILITIES_TRANSACTIONS',
        data: response.data.data
      })
    } else {
      console.log(response)
      swal('Oops!', 'Somthing went wrong with your network.', 'error')
    }
  }
}

// Filtered Utility Transactions
export const getFilteredStudentOrders = (orders, params) => {
  return async dispatch => {
    const { q = '', perPage = 10, page = 1 } = params
    /* eslint-enable */

    const queryLowered = q.toLowerCase()
    const filteredData = orders.filter(
      order => (order.orderNumber.toLowerCase().includes(queryLowered) || moment(order.createdAt).format('lll').toLowerCase().includes(queryLowered)))
    /* eslint-enable  */
    await dispatch({
      type: 'GET_KITCHEN_STAFF_ORDERS',
      data: paginateArray(filteredData, perPage, page),
      totalPages: filteredData.length,
      params
    })
  }
}

// Filtered Books
export const getFilteredStudentBooks = (books, params) => {
  return async dispatch => {
    const { q = '', perPage = 10, page = 1 } = params
    /* eslint-enable */

    const queryLowered = q.toLowerCase()
    const filteredData = books.filter(
      book => (book.name.toLowerCase().includes(queryLowered)))
    /* eslint-enable  */
    await dispatch({
      type: 'GET_KITCHEN_STAFF_ORDERS',
      data: paginateArray(filteredData, perPage, page),
      totalPages: filteredData.length,
      params
    })
  }
}


// update student status
export const updateStudentStatus = (studentId, status) => {
  return async dispatch => {
    const body = JSON.stringify({status})
    const response = await apiRequest({ url: `/students/update/${studentId}`, method: 'POST', body }, dispatch)
    if (response) {
      console.log(response)
      if (response.data.status) {
        await dispatch(getAllData())
        await dispatch(getStudentDetails(studentId))
        swal('Good!', `${response.data.message}.`, 'success')
      } else {
        swal('Oops!', `${response.data.message}.`, 'error')
      }
    } else {
      swal('Oops!', 'Something went wrong with your network.', 'error')
    }

  }
}

// deactivate User account
export const deactivateUser = (users, id) => {
  const user = users.find(i => i.user_id === id)
  return async dispatch => {
    const response = await apiRequest({ url: `/admin/users/deactivate/${user.user_id}`, method: 'GET' }, dispatch)
    if (response) {
      if (response.data.success) {
        dispatch({
          type: 'GET_USER',
          selectedUser: { ...user, status: "Inactive" }
        })
        swal('Good!', `${response.data.message}.`, 'success')
        dispatch(getAllData())
      } else {
        swal('Oops!', `${response.data.message}.`, 'error')
      }
    } else {
      swal('Oops!', 'Something went wrong with your network.', 'error')
    }

  }
}

//  Reset User Password
export const passwordReset = ({ user_id }) => {
  return async dispatch => {
    const body = JSON.stringify({ user_id })
    const response = await apiRequest({ url: `/admin/users/reset/`, method: 'POST', body }, dispatch)
    if (response && response.data.success) {
      swal('Good!', `User password reset Sucessfully.`, 'success')
    } else {
      console.log(response)
      swal('Oops!', 'Somthing went wrong with your network.', 'error')
    }
  }
}
