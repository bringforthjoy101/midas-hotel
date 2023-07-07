import { paginateArray, sortCompare, apiRequest, swal } from '@utils'
import moment from 'moment'

export const apiUrl = process.env.REACT_APP_API_ENDPOINT

// ** Get all User Data
export const getAllData = () => {
	return async (dispatch) => {
		const response = await apiRequest({ url: '/sales', method: 'GET' }, dispatch)
		if (response && response.data.data && response.data.status) {
			await dispatch({
				type: 'GET_ALL_SALES_DATA',
				data: response.data.data,
			})
		} else {
			console.log(response)
			swal('Oops!', 'Something went wrong.', 'error')
		}
	}
}

// All Users Filtered Data
export const getFilteredData = (sales, params) => {
	return async (dispatch) => {
		const { q = '', perPage = 100, page = 1 } = params

		/* eslint-disable  */
		const queryLowered = q?.toLowerCase()
		const filteredData = sales?.filter(
			(sale) =>
				sale?.saleNumber?.toLowerCase()?.includes(queryLowered) ||
				sale?.user.fullName?.toLowerCase()?.includes(queryLowered) ||
				moment(sale.createdAt).format('lll').includes(q)
		)

		/* eslint-enable  */
		dispatch({
			type: 'GET_FILTERED_SALE_DATA',
			data: paginateArray(filteredData, perPage, page),
			totalPages: filteredData.length,
			params,
		})
	}
}

//  Get User
export const getSale = (id) => {
	return async (dispatch) => {
		const response = await apiRequest({ url: `/sales/get-detail/${id}`, method: 'GET' }, dispatch)
		if (response && response.data.data && response.data.status) {
			await dispatch({
				type: 'GET_SALE',
				selectedSale: response.data.data,
			})
		} else {
			console.log(response)
			swal('Oops!', 'Something went wrong.', 'error')
		}
	}
}
