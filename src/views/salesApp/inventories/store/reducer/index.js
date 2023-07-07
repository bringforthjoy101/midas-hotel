// ** Initial State
const initialState = {
	allData: [],
	data: [],
	total: 1,
	params: {},
	selectedInventory: null,
}

const inventories = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_INVENTORIES_DATA':
			return { ...state, allData: action.data }
		case 'GET_FILTERED_INVENTORY_DATA':
			return {
				...state,
				data: action.data,
				total: action.totalPages,
				params: action.params,
			}
		case 'GET_A_INVENTORY':
			return { ...state, selectedInventory: action.selectedInventory }
		default:
			return { ...state }
	}
}
export default inventories
