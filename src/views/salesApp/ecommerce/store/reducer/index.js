const initialState = {
	services: [],
	wishlist: [],
	cart: [],
	serviceDetail: {},
	params: {},
	totalServices: 0,
}

const ecommerceReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_PRODUCTS':
			return { ...state, services: action.data.services, params: action.params, totalServices: action.data.total }
		case 'GET_T_PRODUCTS':
			return { ...state, services: action.data, params: action.params, totalServices: action.data.length }
		case 'GET_WISHLIST':
			return { ...state, wishlist: action.data.services }
		case 'DELETE_WISHLIST_ITEM':
			return { ...state }
		case 'GET_CART':
			return { ...state, cart: action.data.services }
		case 'DELETE_CART_ITEM':
			return { ...state }
		case 'DELETE_ALL_CART_ITEM':
			return { ...state }
		case 'ADD_TO_WISHLIST':
			return { ...state }
		case 'ADD_TO_CART':
			return { ...state }
		case 'UPDATE_TO_CART':
			return { ...state }
		case 'GET_PRODUCT':
			return { ...state, serviceDetail: action.data.service }
		default:
			return state
	}
}

export default ecommerceReducer
