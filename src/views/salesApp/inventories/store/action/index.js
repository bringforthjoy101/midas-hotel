import { paginateArray, sortCompare, apiRequest, swal } from '@utils'
import moment from 'moment'

export const apiUrl = process.env.REACT_APP_API_ENDPOINT

// ** Get all User Data
export const getAllData = () => {
	return async (dispatch) => {
		const response = await apiRequest({ url: '/inventories', method: 'GET' }, dispatch)
		if (response && response.data.data && response.data.status) {
			await dispatch({
				type: 'GET_ALL_INVENTORIES_DATA',
				data: response.data.data,
			})
		} else {
			console.log(response)
			swal('Oops!', 'Something went wrong.', 'error')
		}
	}
}

// All Users Filtered Data
export const getFilteredData = (inventories, params) => {
	return async (dispatch) => {
		const { category = null, q = '', perPage = 10, page = 1 } = params

		/* eslint-disable  */
		const queryLowered = q?.toLowerCase()
		const filteredData = inventories?.filter((inventory) => inventory?.name?.toLowerCase()?.includes(queryLowered))

		/* eslint-enable  */

		dispatch({
			type: 'GET_FILTERED_INVENTORY_DATA',
			data: paginateArray(filteredData, perPage, page),
			totalPages: filteredData.length,
			params,
		})
	}
}

//  Get User
export const getInventory = (inventoryId) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/inventories/get-detail/${inventoryId}`, method: 'GET' }, dispatch)
		if (response && response.data.data && response.data.status) {
			await dispatch({
				type: 'GET_A_INVENTORY',
				selectedInventory: response.data.data,
			})
		} else {
			console.log(response)
			swal('Oops!', 'Something went wrong.', 'error')
		}
	}
}

export const deleteInventory = (inventoryId) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/inventories/delete/${inventoryId}`, method: 'GET' }, dispatch)
		if (response && response.data.status) {
			return response.data
		} else {
			console.log(response)
			swal('Oops!', 'Something went wrong.', 'error')
		}
	}
}

// Filtered Inventory Histories
export const getFilteredinventoryHistories = (histories, params) => {
	return async (dispatch) => {
		const { q = '', perPage = 10, page = 1 } = params
		/* eslint-enable */

		const queryLowered = q.toLowerCase()
		const filteredData = histories.filter(
			(history) =>
				history?.department?.toLowerCase().includes(queryLowered) || moment(history?.createdAt).format('lll').toLowerCase().includes(queryLowered)
		)
		/* eslint-enable  */
		await dispatch({
			type: 'GET_INVENTORY_HISTORIES',
			data: paginateArray(filteredData, perPage, page),
			totalPages: filteredData.length,
			params,
		})
	}
}

export const logInventory = (inventoryId, inventoryData) => {
	return async (dispatch) => {
		const body = JSON.stringify({ ...inventoryData })
		const response = await apiRequest({ url: `/inventories/update/${inventoryId}`, method: 'POST', body }, dispatch)
		if (response) {
			if (response.data.status) {
				swal('Good!', `${response.data.message}.`, 'success')
				dispatch(getAllData())
				dispatch(getInventory(inventoryId))
			} else {
				swal('Oops!', `${response.data.message}.`, 'error')
			}
		} else {
			console.log(response.error)
			swal('Oops!', 'Somthing went wrong with your network.', 'error')
		}
	}
}
