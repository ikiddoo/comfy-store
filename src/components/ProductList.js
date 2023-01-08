import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  // destructure filtered_products and give alias of 'products'
  const { filtered_products: products, grid_view } = useFilterContext();

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>Sorry, no products matched your search...</h5>
    )
  }
  if (grid_view === false) {
    return <ListView products={products} />
  }
  // pass 'products' as props to grid
  return <GridView products={products}>product list</GridView>
}

export default ProductList
