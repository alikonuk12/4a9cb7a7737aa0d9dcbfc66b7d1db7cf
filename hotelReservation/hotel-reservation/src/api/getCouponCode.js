import axios from 'axios';

async function getCouponCode() {
    const couponCode = await axios({
        method: 'GET',
        url: 'https://5f6d939160cf97001641b049.mockapi.io/tkn/coupons'
    })
    .catch( error => { return error } );

    return couponCode.data;
}

export default getCouponCode;