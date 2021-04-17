import {
    SELECT_NAME,
    SELECT_NUMBER,
    SELECT_MONTH,
    SELECT_YEAR,
    SELECT_CVV,
    RESET_PAYMENT
} from '../types';

const initialState = {
    name: '',
    number: 0,
    month: 0,
    year: 0,
    cvv: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_NAME:
            return {
                ...state,
                name: action.name
            }
        case SELECT_NUMBER:
            return {
                ...state,
                number: action.number
            }
        case SELECT_MONTH:
            return {
                ...state,
                month: action.month
            }
        case SELECT_YEAR:
            return {
                ...state,
                year: action.year
            }
        case SELECT_CVV:
            return {
                ...state,
                cvv: action.cvv
            }
        case RESET_PAYMENT:
            return {
                ...state,
                name: '',
                number: 0,
                month: 0,
                year: 0,
                cvv: 0
            }
        default:
            return state;
    }
}

export default reducer;