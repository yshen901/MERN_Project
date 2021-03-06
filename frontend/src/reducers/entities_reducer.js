import { combineReducers } from 'redux';

import RecipesReducer from './recipes_reducer';
import CartReducer from './cart_reducer';
import FridgeReducer from './fridge_reducer';

export default combineReducers({
  recipes: RecipesReducer,
  cart: CartReducer,
  fridge: FridgeReducer
});