import { paginateArray, sortCompare, apiRequest, swal } from '@utils'

// ** Get all User
export const getAllData = () => {
	return async (dispatch) => {
		const response = await apiRequest({ url: '/users', method: 'GET' }, dispatch)
		if (response) {
			if (response.data.data && response.data.status) {
				await dispatch({
					type: 'GET_ALL_USER_DATA',
					data: response.data.data,
				})
			} else {
				console.log(response.error)
			}
		} else {
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}

// ** Get filtered users on page or row change
export const getFilteredData = (users, params) => {
	return async (dispatch) => {
		const { q = '', perPage = 10, page = 1, role = null, status = null } = params

		/* eslint-disable  */
		const queryLowered = q.toLowerCase()
		const filteredData = users.filter(
			(user) =>
				(user.phone.toLowerCase().includes(queryLowered) || user.fullName.toLowerCase().includes(queryLowered)) &&
				user.role === (role || user.role) &&
				user.status === (status || user.status)
		)
		/* eslint-enable  */

		dispatch({
			type: 'GET_FILTERED_USER_DATA',
			data: paginateArray(filteredData, perPage, page),
			totalPages: filteredData.length,
			params,
		})
	}
}

// get User Details
export const getUser = (id) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/users/get-detail/${id}`, method: 'GET' }, dispatch)
		if (response) {
			if (response?.data?.data && response?.data?.status) {
				await dispatch({
					type: 'GET_USER',
					selectedUser: response.data.data,
				})
			} else {
				console.log(response.error)
			}
		} else {
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}

// get user activity log
export const getUserActivity = (id) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/user/activity/${id}`, method: 'GET' }, dispatch)
		if (response) {
			if (response?.data?.data && response?.data?.status) {
				await dispatch({
					type: 'GET_ALL_USER_ACTIVITY',
					data: response.data.data,
				})
			} else {
				console.log(response.error)
			}
		} else {
			swal('Oops!', 'Something went wrong with your network.', 'error')
		}
	}
}

// activate user account
export const activateUser = (userId) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/users/update/${userId}`, method: 'POST', body: { status: 'ACTIVE' } }, dispatch)
		if (response) {
			if (response.data.status) {
				await dispatch(getUser(userId))
				swal('Good!', `${response.data.message}.`, 'success')
				await dispatch(getAllData())
			} else {
				swal('Oops!', `${response.data.message}.`, 'error')
			}
		} else {
			swal('Oops!', 'Something went wrong with your network.', 'error')
		}
	}
}

// deactivate user account
export const deactivateUser = (userId) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/users/update/${userId}`, method: 'POST', body: { status: 'SUSPENDED' } }, dispatch)
		if (response) {
			if (response.data.status) {
				await dispatch(getUser(userId))
				swal('Good!', `${response.data.message}.`, 'success')
				await dispatch(getAllData())
			} else {
				swal('Oops!', `${response.data.message}.`, 'error')
			}
		} else {
			swal('Oops!', 'Something went wrong with your network.', 'error')
		}
	}
}

// Change user role
export const changeUserRole = (userId, role) => {
	return async (dispatch) => {
		const body = JSON.stringify({ role })
		const response = await apiRequest({ url: `/users/update/${userId}`, method: 'POST', body }, dispatch)
		if (response) {
			if (response.data.status) {
				swal('Good!', `${response.data.message}.`, 'success')
				await dispatch(getAllData())
				await dispatch(getUser(userId))
			} else {
				swal('Oops!', `${response.data.message}.`, 'error')
			}
		} else {
			console.log(response.error)
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}
