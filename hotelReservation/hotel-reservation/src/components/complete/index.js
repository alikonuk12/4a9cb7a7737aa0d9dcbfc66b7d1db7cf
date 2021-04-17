import React from 'react';
import style from './index.module.scss';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { resetHotel } from '../../store/actions/hotel';
import { resetRoom } from '../../store/actions/room';
import { resetPayment } from '../../store/actions/payment';
import CompleteImage from '../../static/images/completeImage.png';
import { Button } from 'react-bootstrap';

function Complete() {
    const { hotelName, hotel, startDate, endDate, adultSize, childSize } = useSelector(state => state.HotelReducer);
    const { roomType, landscape } = useSelector(state => state.RoomReducer);

    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { dayDiff, priceRate, total, unitPrice, code } = location.state;

    const start = Moment(startDate).format('YYYY-MM-DD');
    const end = Moment(endDate).format('YYYY-MM-DD');
    const fixedPriceRate = priceRate.toFixed(2);
    const fixedTotal = total.toFixed(2); 
    const totalDiscount = (fixedTotal - code.discount_ammount).toFixed(2);

    const newReservation = () => {
        dispatch(resetHotel());
        dispatch(resetRoom());
        dispatch(resetPayment());
        history.push('/');
    }

    return (
        <div className={style.container}>
            <div className={style.FirstPart}>
                <img src={CompleteImage} className={style.CompleteImage} alt='completeImage' />
                <div className={style.FirstLine}>Rezervasyon kaydınız alınmıştır</div>
                <div className={style.SecondLine}>Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik veya</div>
                <div className={style.SecondLine}>yeni rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.</div>
                <div className={style.Buttons}>
                    <Button className={style.Button} onClick={newReservation}>Yeni Rezervasyon Yap</Button>
                    <Button className={style.Button}>Rezervasyonu Güncelle</Button>
                    <Button className={style.Button}>Rezervasyonu İptal Et</Button>
                </div>
            </div>
            <div className={style.SecondPart}>
                <div className={style.NameAndCity}>
                    <div className={style.Name}>{hotelName}</div>
                    <div className={style.City}>({hotel.city})</div>
                </div>
                <div className={style.Dates}>
                    <div className={style.StartDateBox}>
                        <div className={style.GirisTarihi}>Giriş Tarihi:</div>
                        <div className={style.StartDate}>{start}</div>
                    </div>
                    <div className={style.EndDateBox}>
                        <div className={style.CikisTarihi}>Çıkış Tarihi:</div>
                        <div className={style.EndDate}>{end}</div>
                    </div>
                </div>
                <div className={style.Sizes}>
                    <div className={style.AdultSizeBox}>
                        <div className={style.Yetiskin}>Yetişkin:</div>
                        <div className={style.AdultSize}>{adultSize}</div>
                    </div>
                    <div className={style.ChildSizeBox}>
                        <div className={style.Cocuk}>Çocuk:</div>
                        <div className={style.ChildSize}>{childSize}</div>
                    </div>
                </div>
                <div className={style.RoomFeatures}>
                    <div className={style.RoomTypeBox}>
                        <div className={style.OdaTipi}>Oda Tipi:</div>
                        <div className={style.RoomType}>{roomType}</div>
                    </div>
                    <div className={style.LandscapeBox}>
                        <div className={style.Manzara}>Manzara:</div>
                        <div className={style.Landscape}>{landscape}</div>
                    </div>
                </div>
                <div className={style.PriceDetailsBox}>
                    <div className={style.RoomPriceLine}>
                        <div className={style.OdaFiyati}>Oda Fiyatı</div>
                        <div className={style.RoomPrice}>{unitPrice} TL</div>
                    </div>
                    <div className={style.PriceRateLine}>
                        <div className={style.FiyatEtkiOranı}>Fiyat Etki Oranı</div>
                        <div className={style.PriceRate}>{fixedPriceRate}</div>
                    </div>
                    <div className={style.AccommodationLine}>
                        <div className={style.Konaklama}>Konaklama</div>
                        <div className={style.Days}>({dayDiff} Gün)</div>
                        <div className={style.TotalPrice}>{fixedTotal} TL</div>
                    </div>
                    <div className={style.CouponLine}>
                        <div className={style.Indirim}>İndirim</div>
                        <div className={style.CouponCode}>({code.code})</div>
                        <div className={style.Discount}>-{code.discount_ammount} TL</div>
                    </div>
                </div>
                <div className={style.TotalPriceBox}>
                    <div className={style.ToplamTutar}>Toplam Tutar</div>
                    <div className={style.TotalPrice}>{totalDiscount} TL</div>
                </div>
            </div>
        </div>
    );
}

export default Complete;