// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import chat from '@src/views/apps/chat/store/reducer'
import todo from '@src/views/apps/todo/store/reducer'
// import users from '@src/views/apps/user/store/reducer'

import inventories from '@src/views/salesApp/inventories/store/reducer'
import users from '@src/views/salesApp/users/store/reducer'
import servers from '@src/views/salesApp/servers/store/reducer'
import products from '@src/views/salesApp/products/store/reducer'
import sales from '@src/views/salesApp/sales/store/reducer'
import reports from '@src/views/salesApp/reports/store/reducer'

import email from '@src/views/apps/email/store/reducer'
// import invoice from '@src/views/apps/invoice/store/reducer'
import invoice from '@src/views/invoiceApp/store/reducer'
import calendar from '@src/views/apps/calendar/store/reducer'
import ecommerce from '@src/views/apps/ecommerce/store/reducer'
import dataTables from '@src/views/tables/data-tables/store/reducer'

const rootReducer = combineReducers({
	auth,
	todo,
	chat,
	email,
	users,
	servers,
	inventories,
	reports,
	// admins,
	products,
	// transactions,
	sales,
	navbar,
	layout,
	invoice,
	calendar,
	ecommerce,
	dataTables,
})

export default rootReducer
