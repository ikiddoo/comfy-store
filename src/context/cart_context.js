import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

// get local storage
const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'));
  } else {
    return [];
  }
}

const initialState = {
  // initialize cart properties
  cart: getLocalStorage(), // get cart from localStorage
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  // create state and dispatch with reducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  // handle add to cart
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  }
  // handle remove item
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  // handle toggle amount
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };
  // clear cart 
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  // update local storage if cart updates
  useEffect(() => {
    // dispatch total if cart changes
    dispatch({ type: COUNT_CART_TOTALS })
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart]);

  // expose state & addToCart
  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
