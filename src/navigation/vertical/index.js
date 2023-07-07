// ** Navigation sections imports
import dashboards from './dashboards'
import stores from './stores'
import inventories from './inventories'
import products from './products.js'
import sales from './sales'
import users from './users'
import servers from './servers'
import reports from './reports'
import settings from './settings'

const userData = JSON.parse(localStorage.getItem('userData'))

// ** Merge & Export
export default userData?.role === 'ADMIN'
	? [...dashboards, ...stores, ...sales, ...products, ...inventories, ...users, ...servers, ...reports, ...settings]
	: userData?.role === 'SALES_REP'
	? [...dashboards, ...stores, ...sales, ...settings]
	: [...dashboards, ...stores, ...sales, ...inventories, ...reports, ...settings]

// ** Merge & Export
// export default [...dashboards, ...stores, ...sales, ...products, ...inventories, ...users, ...reports, ...settings]
