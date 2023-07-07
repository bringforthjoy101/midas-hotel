// ** Initial State
const initialState = {
	allData: [],
	data: [],
	total: 1,
	params: {},
	selectedSale: null,
}

const sales = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_SALES_DATA':
			return { ...state, allData: action.data }
		case 'GET_FILTERED_SALE_DATA':
			return {
				...state,
				data: action.data,
				total: action.totalPages,
				params: action.params,
			}
		case 'GET_SALE':
			return { ...state, selectedSale: action.selectedSale }
		default:
			return { ...state }
	}
}
export default sales
