import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  // handle load product action & get max price
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      // copy maxPrice over to filters.
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }
    };
  }
  // handle grid and list view action
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  // handle update sort action
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  // handle sort action
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === 'price-lowest')
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
    if (sort === 'price-highest')
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    if (sort === 'name-a')
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-z')
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    return { ...state, filtered_products: tempProducts };
  }
  // handle update filter action
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    // update the filters options only where the value changes in the property.
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  // handle filter products by text.
  if (action.type === FILTER_PRODUCTS) {
    console.log('filter products!!!')
    // destruct all products from state
    const { all_products } = state;
    // destruct all filter properties
    const { text, category, company, color, price, shipping } = state.filters;
    // create temp products array
    let tempProducts = [...all_products];
    console.log(tempProducts)
    console.log(text)
    // filter by text
    if (text) {
      console.log(text);
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    // by category
    if (category !== 'all') {
      tempProducts = tempProducts.filter((product) => product.category === category)
    }
    // by company
    if (company !== 'all') {
      tempProducts = tempProducts.filter((product) => product.company === company);
    }
    // by colors
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }
    // by price
    tempProducts = tempProducts.filter((product) => product.price <= price);
    // by shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true);
    }
    // copy tempProducts over to state
    return { ...state, filtered_products: tempProducts }
  };
  // handle clear filters action
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state, filters: {
        ...state.filters, text: '', company: 'all', category: 'all', color: 'all',
        price: state.filters.max_price, shipping: false
      }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
