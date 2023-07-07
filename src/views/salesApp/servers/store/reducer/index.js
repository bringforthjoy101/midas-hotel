// ** Initial State
const initialState = {
	allData: [],
	data: [],
	total: 1,
	params: {},
	selectedServer: null,
	serverActivities: [],
}

const servers = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_SERVER_DATA':
			return { ...state, allData: action.data }
		case 'GET_FILTERED_SERVER_DATA':
			return {
				...state,
				data: action.data,
				total: action.totalPages,
				params: action.params,
			}
		case 'GET_SERVER':
			return { ...state, selectedServer: action.selectedServer }
		case 'GET_ALL_SERVER_ACTIVITY':
			return { ...state, serverActivities: action.data }
		default:
			return { ...state }
	}
}
export default servers
