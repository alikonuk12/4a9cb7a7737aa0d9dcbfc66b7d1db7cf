import {
    SELECT_HOTEL,
    SELECT_START_DATE,
    SELECT_END_DATE,
    SELECT_ADULT_SIZE,
    SELECT_CHILD_SIZE,
    RESET_HOTEL
} from '../types';

const initialState = {
    hotel: {},
    hotelName: '',
    startDate: null,
    endDate: null,
    adultSize: 0,
    childSize: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_HOTEL:
            return {
                ...state,
                hotel: action.hotel,
                hotelName: action.hotelName
            }
        case SELECT_START_DATE:
            return {
                ...state,
                startDate: action.startDate
            }
        case SELECT_END_DATE:
            return {
                ...state,
                endDate: action.endDate
            }
        case SELECT_ADULT_SIZE:
            return {
                ...state,
                adultSize: action.adultSize
            }
        case SELECT_CHILD_SIZE:
            return {
                ...state,
                childSize: action.childSize
            }
        case RESET_HOTEL:
            return {
                ...state,
                hotel: {},
                hotelName: '',
                startDate: null,
                endDate: null,
                adultSize: 0,
                childSize: 0
            }
        default:
            return state;
    }
}

export default reducer;