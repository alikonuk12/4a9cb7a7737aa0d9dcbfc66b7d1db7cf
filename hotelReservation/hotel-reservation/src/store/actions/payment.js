import {
    SELECT_NAME,
    SELECT_NUMBER,
    SELECT_MONTH,
    SELECT_YEAR,
    SELECT_CVV,
    RESET_PAYMENT
} from '../types';

export const selectName = (name) => {
    return {
        type: SELECT_NAME,
        name: name
    }
}

export const selectNumber = (number) => {
    return {
        type: SELECT_NUMBER,
        number: number
    }
}

export const selectMonth = (month) => {
    return {
        type: SELECT_MONTH,
        month: month
    }
}

export const selectYear = (year) => {
    return {
        type: SELECT_YEAR,
        year: year
    }
}

export const selectCvv = (cvv) => {
    return {
        type: SELECT_CVV,
        cvv: cvv
    }
}

export const resetPayment = () => {
    return {
        type: RESET_PAYMENT
    }
}