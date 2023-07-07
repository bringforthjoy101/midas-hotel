import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const userData = JSON.parse(localStorage.getItem('userData'))

const ManagerRoutes = [
	{
		path: '/apps/ecommerce/shop',
		className: 'ecommerce-application',
		component: lazy(() => import('../../views/salesApp/ecommerce/shop')),
	},
	{
		path: '/apps/ecommerce/wishlist',
		className: 'ecommerce-application',
		component: lazy(() => import('../../views/salesApp/ecommerce/wishlist')),
	},
	{
		path: '/apps/ecommerce/product-detail',
		exact: true,
		className: 'ecommerce-application',
		component: () => <Redirect to="/apps/salesApp/product-detail/apple-i-phone-11-64-gb-black-26" />,
	},
	{
		path: '/apps/ecommerce/product-detail/:product',
		exact: true,
		className: 'ecommerce-application',
		component: lazy(() => import('../../views/salesApp/ecommerce/detail')),
		meta: {
			navLink: '/apps/ecommerce/product-detail',
		},
	},
	{
		path: '/apps/ecommerce/checkout',
		className: 'ecommerce-application',
		component: lazy(() => import('../../views/salesApp/ecommerce/checkout')),
	},
	{
		path: '/users/list',
		component: lazy(() => import('../../views/salesApp/users/list')),
	},
	{
		path: '/users/view',
		exact: true,
		component: () => <Redirect to="/salesApp/user/view/1" />,
	},
	{
		path: '/users/view/:id',
		component: lazy(() => import('../../views/salesApp/users/view')),
		meta: {
			navLink: '/salesApp/user/view',
		},
	},
	{
		path: '/inventories/list',
		component: lazy(() => import('../../views/salesApp/inventories/list')),
	},
	{
		path: '/inventories/view',
		exact: true,
		component: () => <Redirect to="/salesApp/inventories/view/1" />,
	},
	{
		path: '/inventories/view/:id',
		component: lazy(() => import('../../views/salesApp/inventories/view')),
		meta: {
			navLink: '/salesApp/inventories/view',
		},
	},
	{
		path: '/inventories/edit',
		exact: true,
		component: () => <Redirect to="/inventories/edit/1" />,
	},
	{
		path: '/inventories/edit/:id',
		component: lazy(() => import('../../views/salesApp/inventories/edit')),
		meta: {
			navLink: '/inventories/edit',
		},
	},
	{
		path: '/products/list',
		component: lazy(() => import('../../views/salesApp/products/list')),
	},
	{
		path: '/products/view',
		exact: true,
		component: () => <Redirect to="/salesApp/products/view/1" />,
	},
	{
		path: '/products/view/:id',
		component: lazy(() => import('../../views/salesApp/products/view')),
		meta: {
			navLink: '/salesApp/products/view',
		},
	},
	{
		path: '/products/edit',
		exact: true,
		component: () => <Redirect to="/products/edit/1" />,
	},
	{
		path: '/products/edit/:id',
		component: lazy(() => import('../../views/salesApp/products/edit')),
		meta: {
			navLink: '/products/edit',
		},
	},
	{
		path: '/sales/list',
		component: lazy(() => import('../../views/salesApp/sales/list')),
	},
	{
		path: '/sales/view',
		exact: true,
		component: () => <Redirect to="/salesApp/sales/view/1" />,
	},
	{
		path: '/sales/view/:id',
		component: lazy(() => import('../../views/salesApp/sales/view')),
		meta: {
			navLink: '/salesApp/sales/view',
		},
	},
	{
		path: '/sales/preview/:id',
		component: lazy(() => import('../../views/salesApp/sales/preview')),
		meta: {
			navLink: '/invoice/preview',
		},
	},
	{
		path: '/sales/preview',
		exact: true,
		component: () => <Redirect to="/sales/preview/1" />,
	},
	{
		path: '/sales/print/:id',
		layout: 'BlankLayout',
		component: lazy(() => import('../../views/salesApp/sales/print')),
	},
	{
		path: '/reports/list',
		component: lazy(() => import('../../views/salesApp/reports/list')),
	},
	{
		path: '/settings/list',
		component: lazy(() => import('../../views/salesApp/settings/list')),
	},
	{
		path: '/servers/list',
		component: lazy(() => import('../../views/salesApp/servers/list')),
	},
	{
		path: '/servers/view',
		exact: true,
		component: () => <Redirect to="/salesApp/server/view/1" />,
	},
	{
		path: '/servers/view/:id',
		component: lazy(() => import('../../views/salesApp/servers/view')),
		meta: {
			navLink: '/salesApp/server/view',
		},
	},
]

const SalesRepRoutes = [
	{
		path: '/apps/ecommerce/shop',
		className: 'ecommerce-application',
		component: lazy(() => import('../../views/salesApp/ecommerce/shop')),
	},
	{
		path: '/apps/ecommerce/wishlist',
		className: 'ecommerce-application',
		component: lazy(() => import('../../views/salesApp/ecommerce/wishlist')),
	},
	{
		path: '/apps/ecommerce/product-detail',
		exact: true,
		className: 'ecommerce-application',
		component: () => <Redirect to="/apps/salesApp/product-detail/apple-i-phone-11-64-gb-black-26" />,
	},
	{
		path: '/apps/ecommerce/product-detail/:product',
		exact: true,
		className: 'ecommerce-application',
		component: lazy(() => import('../../views/salesApp/ecommerce/detail')),
		meta: {
			navLink: '/apps/ecommerce/product-detail',
		},
	},
	{
		path: '/apps/ecommerce/checkout',
		className: 'ecommerce-application',
		component: lazy(() => import('../../views/salesApp/ecommerce/checkout')),
	},
	{
		path: '/sales/list',
		component: lazy(() => import('../../views/salesApp/sales/list')),
	},
	{
		path: '/sales/view',
		exact: true,
		component: () => <Redirect to="/salesApp/sales/view/1" />,
	},
	{
		path: '/sales/view/:id',
		component: lazy(() => import('../../views/salesApp/sales/view')),
		meta: {
			navLink: '/salesApp/sales/view',
		},
	},
	{
		path: '/sales/preview/:id',
		component: lazy(() => import('../../views/salesApp/sales/preview')),
		meta: {
			navLink: '/invoice/preview',
		},
	},
	{
		path: '/sales/preview',
		exact: true,
		component: () => <Redirect to="/sales/preview/1" />,
	},
	{
		path: '/sales/print/:id',
		layout: 'BlankLayout',
		component: lazy(() => import('../../views/salesApp/sales/print')),
	},
]

const StoreRoutes = [
	{
		path: '/apps/ecommerce/shop',
		className: 'ecommerce-application',
		component: lazy(() => import('../../views/salesApp/ecommerce/shop')),
	},
	{
		path: '/apps/ecommerce/wishlist',
		className: 'ecommerce-application',
		component: lazy(() => import('../../views/salesApp/ecommerce/wishlist')),
	},
	{
		path: '/apps/ecommerce/product-detail',
		exact: true,
		className: 'ecommerce-application',
		component: () => <Redirect to="/apps/salesApp/product-detail/apple-i-phone-11-64-gb-black-26" />,
	},
	{
		path: '/apps/ecommerce/product-detail/:product',
		exact: true,
		className: 'ecommerce-application',
		component: lazy(() => import('../../views/salesApp/ecommerce/detail')),
		meta: {
			navLink: '/apps/ecommerce/product-detail',
		},
	},
	{
		path: '/apps/ecommerce/checkout',
		className: 'ecommerce-application',
		component: lazy(() => import('../../views/salesApp/ecommerce/checkout')),
	},
	{
		path: '/sales/list',
		component: lazy(() => import('../../views/salesApp/sales/list')),
	},
	{
		path: '/sales/view',
		exact: true,
		component: () => <Redirect to="/salesApp/sales/view/1" />,
	},
	{
		path: '/sales/view/:id',
		component: lazy(() => import('../../views/salesApp/sales/view')),
		meta: {
			navLink: '/salesApp/sales/view',
		},
	},
	{
		path: '/sales/preview/:id',
		component: lazy(() => import('../../views/salesApp/sales/preview')),
		meta: {
			navLink: '/invoice/preview',
		},
	},
	{
		path: '/sales/preview',
		exact: true,
		component: () => <Redirect to="/sales/preview/1" />,
	},
	{
		path: '/sales/print/:id',
		layout: 'BlankLayout',
		component: lazy(() => import('../../views/salesApp/sales/print')),
	},
	{
		path: '/inventories/list',
		component: lazy(() => import('../../views/salesApp/inventories/list')),
	},
	{
		path: '/inventories/view',
		exact: true,
		component: () => <Redirect to="/salesApp/inventories/view/1" />,
	},
	{
		path: '/inventories/view/:id',
		component: lazy(() => import('../../views/salesApp/inventories/view')),
		meta: {
			navLink: '/salesApp/inventories/view',
		},
	},
	{
		path: '/inventories/edit',
		exact: true,
		component: () => <Redirect to="/inventories/edit/1" />,
	},
	{
		path: '/inventories/edit/:id',
		component: lazy(() => import('../../views/salesApp/inventories/edit')),
		meta: {
			navLink: '/inventories/edit',
		},
	},
	{
		path: '/reports/list',
		component: lazy(() => import('../../views/salesApp/reports/list')),
	},
]

export default userData?.role === 'ADMIN' ? ManagerRoutes : userData?.role === 'SALES_REP' ? SalesRepRoutes : StoreRoutes
// export default ManagerRoutes
