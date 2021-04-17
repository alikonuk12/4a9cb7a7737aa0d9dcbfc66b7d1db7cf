import { createStore, combineReducers } from 'redux';
import { HotelReducer, RoomReducer, PaymentReducer } from './reducers';

const reducers = combineReducers({
    HotelReducer: HotelReducer,
    RoomReducer: RoomReducer,
    PaymentReducer: PaymentReducer
});

const store = createStore(reducers);

export default store;