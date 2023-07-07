import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const userData = JSON.parse(localStorage.getItem('userData'))


const ManagerRoutes = [
    {
        path: '/apps/ecommerce/shop',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/tuck-shop/ecommerce/shop'))
    },
    {
        path: '/apps/ecommerce/wishlist',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/tuck-shop/ecommerce/wishlist'))
    },
    {
        path: '/apps/ecommerce/product-detail',
        exact: true,
        className: 'ecommerce-application',
        component: () => <Redirect to='/apps/tuck-shop/product-detail/apple-i-phone-11-64-gb-black-26' />
    },
    {
        path: '/apps/ecommerce/product-detail/:product',
        exact: true,
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/tuck-shop/ecommerce/detail')),
        meta: {
          navLink: '/apps/ecommerce/product-detail'
        }
    },
    {
        path: '/apps/ecommerce/checkout',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/tuck-shop/ecommerce/checkout'))
    },
    {
        path: '/admins/list',
        component: lazy(() => import('../../views/tuck-shop/admin/list'))
      },
      {
        path: '/admin/view',
        exact: true,
        component: () => <Redirect to='/tuck-shop/admin/view/1' />
      },
      {
        path: '/admin/view/:id',
        component: lazy(() => import('../../views/tuck-shop/admin/view')),
        meta: {
          navLink: '/tuck-shop/admin/view'
        }
      },
      {
        path: '/students/list',
        component: lazy(() => import('../../views/tuck-shop/student/list'))
      },
      {
        path: '/student/view',
        exact: true,
        component: () => <Redirect to='/tuck-shop/student/view/1' />
      },
      {
        path: '/student/view/:id',
        component: lazy(() => import('../../views/tuck-shop/student/view')),
        meta: {
          navLink: '/tuck-shop/student/view'
        }
      },
      {
        path: '/kitchen-staffs/list',
        component: lazy(() => import('../../views/tuck-shop/kitchen-staffs/list'))
      },
      {
        path: '/kitchen-staff/view',
        exact: true,
        component: () => <Redirect to='/tuck-shop/kitchen-staffs/view/1' />
      },
      {
        path: '/kitchen-staff/view/:id',
        component: lazy(() => import('../../views/tuck-shop/kitchen-staffs/view')),
        meta: {
          navLink: '/tuck-shop/kitchen-staff/view'
        }
      },
      {
        path: '/products/list',
        component: lazy(() => import('../../views/tuck-shop/product/list'))
      },
      {
        path: '/product/view',
        exact: true,
        component: () => <Redirect to='/tuck-shop/product/view/1' />
      },
      {
        path: '/product/view/:id',
        component: lazy(() => import('../../views/tuck-shop/product/view')),
        meta: {
          navLink: '/tuck-shop/product/view'
        }
      },
      {
        path: '/product/edit',
        exact: true,
        component: () => <Redirect to='/product/edit/1' />
      },
      {
        path: '/product/edit/:id',
        component: lazy(() => import('../../views/tuck-shop/product/edit')),
        meta: {
          navLink: '/product/edit'
        }
      },
      {
        path: '/orders/list',
        component: lazy(() => import('../../views/tuck-shop/order/list'))
      },
      {
        path: '/order/view',
        exact: true,
        component: () => <Redirect to='/tuck-shop/order/view/1' />
      },
      {
        path: '/order/view/:id',
        component: lazy(() => import('../../views/tuck-shop/order/view')),
        meta: {
          navLink: '/tuck-shop/order/view'
        }
      },
      {
        path: '/transactions/list',
        component: lazy(() => import('../../views/tuck-shop/transaction/list'))
      },
      {
        path: '/transaction/view',
        exact: true,
        component: () => <Redirect to='/tuck-shop/transaction/view/1' />
      },
      {
        path: '/transaction/view/:id',
        component: lazy(() => import('../../views/tuck-shop/transaction/view')),
        meta: {
          navLink: '/tuck-shop/transaction/view'
        }
      },
      {
        path: '/settings/list',
        component: lazy(() => import('../../views/tuck-shop/settings/list'))
      }
]

const BusaryRoutes = [
  {
    path: '/apps/ecommerce/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/tuck-shop/ecommerce/shop'))
  },
  {
      path: '/apps/ecommerce/wishlist',
      className: 'ecommerce-application',
      component: lazy(() => import('../../views/tuck-shop/ecommerce/wishlist'))
  },
  {
      path: '/apps/ecommerce/product-detail',
      exact: true,
      className: 'ecommerce-application',
      component: () => <Redirect to='/apps/tuck-shop/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
      path: '/apps/ecommerce/product-detail/:product',
      exact: true,
      className: 'ecommerce-application',
      component: lazy(() => import('../../views/tuck-shop/ecommerce/detail')),
      meta: {
        navLink: '/apps/ecommerce/product-detail'
      }
  },
  {
      path: '/apps/ecommerce/checkout',
      className: 'ecommerce-application',
      component: lazy(() => import('../../views/tuck-shop/ecommerce/checkout'))
  },
  {
    path: '/admins/list',
    component: lazy(() => import('../../views/tuck-shop/admin/list'))
  },
  {
    path: '/admin/view',
    exact: true,
    component: () => <Redirect to='/tuck-shop/admin/view/1' />
  },
  {
    path: '/admin/view/:id',
    component: lazy(() => import('../../views/tuck-shop/admin/view')),
    meta: {
      navLink: '/tuck-shop/admin/view'
    }
  },
  {
    path: '/students/list',
    component: lazy(() => import('../../views/tuck-shop/student/list'))
  },
  {
    path: '/student/view',
    exact: true,
    component: () => <Redirect to='/tuck-shop/student/view/1' />
  },
  {
    path: '/student/view/:id',
    component: lazy(() => import('../../views/tuck-shop/student/view')),
    meta: {
      navLink: '/tuck-shop/student/view'
    }
  },
  {
    path: '/kitchen-staffs/list',
    component: lazy(() => import('../../views/tuck-shop/kitchen-staffs/list'))
  },
  {
    path: '/kitchen-staff/view',
    exact: true,
    component: () => <Redirect to='/tuck-shop/kitchen-staffs/view/1' />
  },
  {
    path: '/kitchen-staff/view/:id',
    component: lazy(() => import('../../views/tuck-shop/kitchen-staffs/view')),
    meta: {
      navLink: '/tuck-shop/kitchen-staff/view'
    }
  },
  {
    path: '/orders/list',
    component: lazy(() => import('../../views/tuck-shop/order/list'))
  },
  {
    path: '/order/view',
    exact: true,
    component: () => <Redirect to='/tuck-shop/order/view/1' />
  },
  {
    path: '/order/view/:id',
    component: lazy(() => import('../../views/tuck-shop/order/view')),
    meta: {
      navLink: '/tuck-shop/order/view'
    }
  },
  {
    path: '/transactions/list',
    component: lazy(() => import('../../views/tuck-shop/transaction/list'))
  },
  {
    path: '/transaction/view',
    exact: true,
    component: () => <Redirect to='/tuck-shop/transaction/view/1' />
  },
  {
    path: '/transaction/view/:id',
    component: lazy(() => import('../../views/tuck-shop/transaction/view')),
    meta: {
      navLink: '/tuck-shop/transaction/view'
    }
  }
]

const SalesRepRoutes = [
  {
    path: '/apps/ecommerce/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/tuck-shop/ecommerce/shop'))
  },
  {
      path: '/apps/ecommerce/wishlist',
      className: 'ecommerce-application',
      component: lazy(() => import('../../views/tuck-shop/ecommerce/wishlist'))
  },
  {
      path: '/apps/ecommerce/product-detail',
      exact: true,
      className: 'ecommerce-application',
      component: () => <Redirect to='/apps/tuck-shop/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
      path: '/apps/ecommerce/product-detail/:product',
      exact: true,
      className: 'ecommerce-application',
      component: lazy(() => import('../../views/tuck-shop/ecommerce/detail')),
      meta: {
        navLink: '/apps/ecommerce/product-detail'
      }
  },
  {
      path: '/apps/ecommerce/checkout',
      className: 'ecommerce-application',
      component: lazy(() => import('../../views/tuck-shop/ecommerce/checkout'))
  },
  {
    path: '/students/list',
    component: lazy(() => import('../../views/tuck-shop/student/list'))
  },
  {
    path: '/student/view',
    exact: true,
    component: () => <Redirect to='/tuck-shop/student/view/1' />
  },
  {
    path: '/student/view/:id',
    component: lazy(() => import('../../views/tuck-shop/student/view')),
    meta: {
      navLink: '/tuck-shop/student/view'
    }
  }
]

const StoreRoutes = [
  {
    path: '/apps/ecommerce/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/tuck-shop/ecommerce/shop'))
  },
  {
      path: '/apps/ecommerce/wishlist',
      className: 'ecommerce-application',
      component: lazy(() => import('../../views/tuck-shop/ecommerce/wishlist'))
  },
  {
      path: '/apps/ecommerce/product-detail',
      exact: true,
      className: 'ecommerce-application',
      component: () => <Redirect to='/apps/tuck-shop/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
      path: '/apps/ecommerce/product-detail/:product',
      exact: true,
      className: 'ecommerce-application',
      component: lazy(() => import('../../views/tuck-shop/ecommerce/detail')),
      meta: {
        navLink: '/apps/ecommerce/product-detail'
      }
  },
  {
      path: '/apps/ecommerce/checkout',
      className: 'ecommerce-application',
      component: lazy(() => import('../../views/tuck-shop/ecommerce/checkout'))
  },
  {
    path: '/kitchen-staffs/list',
    component: lazy(() => import('../../views/tuck-shop/kitchen-staffs/list'))
  },
  {
    path: '/kitchen-staff/view',
    exact: true,
    component: () => <Redirect to='/tuck-shop/kitchen-staffs/view/1' />
  },
  {
    path: '/kitchen-staff/view/:id',
    component: lazy(() => import('../../views/tuck-shop/kitchen-staffs/view')),
    meta: {
      navLink: '/tuck-shop/kitchen-staff/view'
    }
  }
]

export default userData?.role === 'manager' ? ManagerRoutes : userData?.role === 'busary' ? BusaryRoutes : userData?.role === 'sales rep' ? SalesRepRoutes : StoreRoutes
