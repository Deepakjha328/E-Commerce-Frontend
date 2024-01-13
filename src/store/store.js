import {createStore, combineReducers} from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'

const reducers = {
  // ... other reducers ...
  toastr: toastrReducer // <- Mounted at toastr.
}
const reducer = combineReducers(reducers)
export const store = createStore(reducer)