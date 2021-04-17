import {
    SELECT_ROOM_TYPE,
    SELECT_LANDSCAPE,
    RESET_ROOM
} from '../types';

export const selectRoomType = (roomType) => {
    return {
        type: SELECT_ROOM_TYPE,
        roomType: roomType
    }
}

export const selectLandscape = (landscape) => {
    return {
        type: SELECT_LANDSCAPE,
        landscape: landscape
    }
}

export const resetRoom = () => {
    return {
        type: RESET_ROOM
    }
}