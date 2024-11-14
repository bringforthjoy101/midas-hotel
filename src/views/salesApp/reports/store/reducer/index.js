// ** Initial State
const initialState = {
	allData: [],
	data: [],
	total: 1,
	params: {},
	selectedReport: null,
}

const reports = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_REPORT_DATA':
			return { ...state, allData: action.data.saleslist, summaryData: action.data.reportSummary, data: [] }
		case 'GET_FILTERED_REPORT_DATA':
			return {
				...state,
				data: action.data,
				total: action.totalPages,
				params: action.params,
			}
		case 'GET_REPORT':
			return { ...state, selectedReport: action.selectedReport }
		default:
			return { ...state }
	}
}
export default reports
