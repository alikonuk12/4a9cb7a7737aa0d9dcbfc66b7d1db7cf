import axios from 'axios';

async function getHotelDetails() {
    const hotelDetails = await axios({
        method: 'GET',
        url: 'https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details'
    })
    .catch( error => { return error } );

    return hotelDetails.data;
}

export default getHotelDetails;