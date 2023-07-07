import { paginateArray, sortCompare, apiRequest, swal } from '@utils'

// ** Get all Server
export const getAllData = () => {
	return async (dispatch) => {
		const response = await apiRequest({ url: '/servers', method: 'GET' }, dispatch)
		if (response) {
			if (response.data.data && response.data.status) {
				await dispatch({
					type: 'GET_ALL_SERVER_DATA',
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

// ** Get filtered servers on page or row change
export const getFilteredData = (servers, params) => {
	return async (dispatch) => {
		const { q = '', perPage = 10, page = 1, role = null, status = null } = params

		/* eslint-disable  */
		const queryLowered = q.toLowerCase()
		const filteredData = servers.filter(
			(server) =>
				(server.phone.toLowerCase().includes(queryLowered) || server.fullName.toLowerCase().includes(queryLowered)) &&
				server.role === (role || server.role) &&
				server.status === (status || server.status)
		)
		/* eslint-enable  */

		dispatch({
			type: 'GET_FILTERED_SERVER_DATA',
			data: paginateArray(filteredData, perPage, page),
			totalPages: filteredData.length,
			params,
		})
	}
}

// get Server Details
export const getServer = (id) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/servers/get-detail/${id}`, method: 'GET' }, dispatch)
		if (response) {
			if (response?.data?.data && response?.data?.status) {
				await dispatch({
					type: 'GET_SERVER',
					selectedServer: response.data.data,
				})
			} else {
				console.log(response.error)
			}
		} else {
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}

// activate server account
export const activateServer = (serverId) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/servers/update/${serverId}`, method: 'POST', body: { status: 'ACTIVE' } }, dispatch)
		if (response) {
			if (response.data.status) {
				await dispatch(getServer(serverId))
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

// deactivate server account
export const deactivateServer = (serverId) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/servers/update/${serverId}`, method: 'POST', body: { status: 'SUSPENDED' } }, dispatch)
		if (response) {
			if (response.data.status) {
				await dispatch(getServer(serverId))
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
