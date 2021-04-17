import axios from 'axios';

async function postReservation(infos) {
    await axios.post('https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings', infos);
}

export default postReservation;