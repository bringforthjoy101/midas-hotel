// ** React Imports
import { Fragment } from 'react'

// ** Product components
import ProductCards from './ProductCards'
import ProductsHeader from './ProductsHeader'
import ProductsSearchbar from './ProductsSearchbar'

// ** Third Party Components
import classnames from 'classnames'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const ProductsPage = props => {
  // ** Props
  const {
    activeView,
    setActiveView,
    store,
    sidebarOpen,
    getProducts,
    dispatch,
    addToCart,
    addToWishlist,
    getCartItems,
    deleteWishlistItem,
    deleteCartItem,
    setSidebarOpen
  } = props

  // ** Handles pagination
  const handlePageChange = val => {
    if (val === 'next') {
      dispatch(getProducts({ ...store.params, page: store.params.page + 1 }))
    } else if (val === 'prev') {
      dispatch(getProducts({ ...store.params, page: store.params.page - 1 }))
    } else {
      dispatch(getProducts({ ...store.params, page: val }))
    }
  }

  // ** Render pages
  const renderPageItems = () => {
    const arrLength =
      store.totalServices !== 0 && store.filtered.length !== 0 ? Number(store.totalServices) / store.services.length : 3

    return new Array(Math.trunc(arrLength)).fill().map((item, index) => {
      return (
        <PaginationItem
          key={index}
          active={store.params.page === index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          <PaginationLink href='/' onClick={e => e.preventDefault()}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      )
    })
  }

  // ** handle next page click
  const handleNext = () => {
    if (store.params.page !== Number(store.totalServices) / store.services.length) {
      handlePageChange('next')
    }
  }

  return (
    <div className="row">
      <div className='col-md-12'>
        <div className='content-body'>
          <ProductsHeader
            store={store}
            dispatch={dispatch}
            activeView={activeView}
            getProducts={getProducts}
            setActiveView={setActiveView}
            setSidebarOpen={setSidebarOpen}
          />
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <ProductsSearchbar dispatch={dispatch} getProducts={getProducts} store={store} />
          {store.filtered?.length ? (
            <Fragment>
              <ProductCards
                store={store}
                dispatch={dispatch}
                addToCart={addToCart}
                activeView={activeView}
                products={store.filtered}
                getProducts={getProducts}
                getCartItems={getCartItems}
                addToWishlist={addToWishlist}
                deleteCartItem={deleteCartItem}
                deleteWishlistItem={deleteWishlistItem}
              />
              <Pagination className='d-flex justify-content-center'>
                <PaginationItem
                  disabled={store.params.page === 1}
                  className='prev-item'
                  onClick={() => (store.params.page !== 1 ? handlePageChange('prev') : null)}
                >
                  <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
                </PaginationItem>
                {renderPageItems()}
                <PaginationItem
                  className='next-item'
                  onClick={() => handleNext()}
                  disabled={store.params.page === Number(store.totalServices) / store.services.length}
                >
                  <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
                </PaginationItem>
              </Pagination>
            </Fragment>
          ) : (
            <div className='d-flex justify-content-center mt-2'>
              <p>No Results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
