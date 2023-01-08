import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'
import { FaAcquisitionsIncorporated } from 'react-icons/fa'

// init state 
const initialState = {
  // create product properties
  all_products: [],
  filtered_products: [],
  // create grid view property
  grid_view: true,
  // create sort property
  sort: 'price_lowest',
  // create filters property
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  // destruct product from product context
  const { products } = useProductsContext();
  // create state and dispatch with reducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  // on init load, load products
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]); // if product changes, we load the products again.

  // handle sort onChange - & on filter change, dispatch FILTER_PRODUCTS action.
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters])

  // handle set grid and list view
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  // handle updateSort
  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };
  // handle updateFilters
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // get the text from button from category name
    if (name === 'category') {
      value = e.target.textContent;
    }
    // get data color from button
    if (name === 'color') {
      value = e.target.dataset.color;
    }
    // convert price string value to number
    if (name === 'price') {
      value = Number(value)
      console.log(value)
    }
    // get checked data from input
    if (name === 'shipping') {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  // handle clear filters
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  // expose clearFilters context
  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
