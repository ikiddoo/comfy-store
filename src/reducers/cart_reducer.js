import { startTransition } from 'react';
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  // handle add to cart action
  if (action.type === ADD_TO_CART) {
    // get id, color, amount and products from payload
    const { id, color, amount, product } = action.payload;
    // find added item is in cart
    const tempItem = state.cart.find((item) => item.id === id + color);

    // if item exists in cart
    if (tempItem) {
      // TO DO!!!
      const tempCart = state.cart.map((cartItem) => {
        // find cart item & if id matches
        if (cartItem.id === id + color) {
          // handle amount
          let newAmount = cartItem.amount + amount;
          // amount quantity boundary check
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          // update new amount to item cart
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem;
        }
      });
      // copy updated cart to state
      return { ...state, cart: tempCart }
    }
    else {
      // construct new item
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }
      // copy newItem over to cart array.
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  // handle remove cart item action
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart }
  }
  // handle clear cart action
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  // handle toggle amount
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        // handle increment
        if (value === 'inc') {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount }
        }
        // handle decrement
        if (value === 'dec') {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount }
        }
      }
      else {
        return item;
      }
    })
    return { ...state, cart: tempCart }
  }
  // handle cart count total
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce((total, cartItem) => {
      const { amount, price } = cartItem;

      total.total_items += amount;
      total.total_amount += price * amount;
      return total
    }, { total_items: 0, total_amount: 0 });
    return { ...state, total_items, total_amount };
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
