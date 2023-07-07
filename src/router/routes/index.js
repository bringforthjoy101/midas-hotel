// ** Routes Imports
import AppRoutes from './Apps'
import InvoiceAppRoutes from './InvoiceApp'
import FormRoutes from './Forms'
import PagesRoutes from './Pages'
import TablesRoutes from './Tables'
import ChartMapsRoutes from './ChartsMaps'
import DashboardRoutes from './Dashboards'
import UiElementRoutes from './UiElements'
import ExtensionsRoutes from './Extensions'
import PageLayoutsRoutes from './PageLayouts'
// import TuckShopRoutes from './TuckShop'
import SalesAppRoutes from './SalesApp'

// ** Document title
const TemplateTitle = '%s - Sales App'

// ** Default Route
const DefaultRoute = '/dashboard/analytics'

// ** Merge Routes
const Routes = [
	...DashboardRoutes,
	...InvoiceAppRoutes,
	// ...TuckShopRoutes,
	...SalesAppRoutes,
	...AppRoutes,
	...PagesRoutes,
	...UiElementRoutes,
	...ExtensionsRoutes,
	...PageLayoutsRoutes,
	...FormRoutes,
	...TablesRoutes,
	...ChartMapsRoutes,
]

export { DefaultRoute, TemplateTitle, Routes }
