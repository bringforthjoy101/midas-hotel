// ** Initial State
const initialState = {
	allData: [],
	data: [],
	total: 1,
	params: {},
	selectedUser: null,
	userActivities: [],
}

const users = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_USER_DATA':
			return { ...state, allData: action.data }
		case 'GET_FILTERED_USER_DATA':
			return {
				...state,
				data: action.data,
				total: action.totalPages,
				params: action.params,
			}
		case 'GET_USER':
			return { ...state, selectedUser: action.selectedUser }
		case 'GET_ALL_USER_ACTIVITY':
			return { ...state, userActivities: action.data }
		default:
			return { ...state }
	}
}
export default users
