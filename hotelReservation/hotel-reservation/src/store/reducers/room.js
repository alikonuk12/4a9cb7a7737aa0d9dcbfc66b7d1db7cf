import {
    SELECT_ROOM_TYPE,
    SELECT_LANDSCAPE,
    RESET_ROOM
} from '../types';

const initialState = {
    roomType: '',
    landscape: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_ROOM_TYPE:
            return {
                ...state,
                roomType: action.roomType
            }
        case SELECT_LANDSCAPE:
            return {
                ...state,
                landscape: action.landscape
            }
        case RESET_ROOM:
            return {
                ...state,
                roomType: '',
                landscape: ''
            }
        default:
            return state;
    }
}

export default reducer;