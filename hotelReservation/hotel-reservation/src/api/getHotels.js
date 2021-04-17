import axios from 'axios';

async function getHotels() {
    const hotels = await axios({
        method: 'GET',
        url: 'https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels'
    })
    .catch( error => { return error } );

    return hotels.data;
}

export default getHotels;