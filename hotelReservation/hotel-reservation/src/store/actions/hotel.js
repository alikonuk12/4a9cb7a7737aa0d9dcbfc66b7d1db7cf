import {
    SELECT_HOTEL,
    SELECT_START_DATE,
    SELECT_END_DATE,
    SELECT_ADULT_SIZE,
    SELECT_CHILD_SIZE,
    RESET_HOTEL
} from '../types';

export const selectHotel = (selectedHotel, selectedHotelName) => {
    return {
        type: SELECT_HOTEL,
        hotel: selectedHotel,
        hotelName: selectedHotelName
    }
}

export const selectStartDate = (startDate) => {
    return {
        type: SELECT_START_DATE,
        startDate: startDate
    }
}

export const selectEndDate = (endDate) => {
    return {
        type: SELECT_END_DATE,
        endDate: endDate
    }
}

export const selectAdultSize = (adultSize) => {
    return {
        type: SELECT_ADULT_SIZE,
        adultSize: adultSize
    }
}

export const selectChildSize = (childSize) => {
    return {
        type: SELECT_CHILD_SIZE,
        childSize: childSize
    }
}

export const resetHotel = () => {
    return {
        type: RESET_HOTEL
    }
}