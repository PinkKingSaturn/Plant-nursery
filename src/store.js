import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import {createStore} from 'redux';

const initialState = {
    cart: {},
};

const reducer = (state = initialState, action) => {
switch (action.type) {
    case 'ADD_ITEM':
    return { ...state, cart: { ...state.cart, [action.item.name]: (state.cart[action.item.name] || 0) + 1 } };
    default:
    return state;
    }
};

const store = createStore(reducer);
export default store
