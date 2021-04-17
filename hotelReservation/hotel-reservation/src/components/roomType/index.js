import React from 'react';
import style from './index.module.scss';
import Moment from 'moment';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectRoomType, selectLandscape } from '../../store/actions/room';
import { Button } from 'react-bootstrap';


function RoomType() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { hotel, hotelName, startDate, endDate, adultSize, childSize } = useSelector(state => state.HotelReducer);
    const { roomType, landscape } = useSelector(state => state.RoomReducer);

    const start = Moment(startDate).format('YYYY-MM-DD');
    const end = Moment(endDate).format('YYYY-MM-DD');
    const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
    const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24));


    const selectingRoomType = e => {
        dispatch(selectRoomType(e.target.name));
        const types = document.getElementsByName('roomType');

        types.forEach(element => {
            const image = document.getElementById(element.id);

            if (element.id === e.target.name) image.style.border = 'solid 1px green';
            else image.style.border = '0px';
        });
    }

    const selectingLandscape = e => {
        dispatch(selectLandscape(e.target.name));
        const landspaces = document.getElementsByName('scenic');

        landspaces.forEach(element => {
            const landspaces = document.getElementById(element.id);

            if (element.id === e.target.name) landspaces.style.border = 'solid 1px green';
            else landspaces.style.border = '0px';
        });
    }

    const clickToBack = () => {
        history.push('/');
    }

    const clickToSaveAndContinue = () => {
        if (roomType !== '' && landscape !== '') {
            const unitPrice = hotel.room_type.filter(type => type.title === roomType)[0].price;
            const priceRate = (hotel.room_scenic.filter(type => type.title === landscape)[0].price_rate / 100) + 1;
            const total = unitPrice * dayDiff * priceRate;
            history.push('/payment', { total, unitPrice, dayDiff, priceRate });
        } else {
            alert('Bir sonraki sayfaya geçmek için oda tipini ve manzara seçimini yapmanız gerekmektedir!');
        }
    }

    return (
        <div className={style.container}>
            <div className={style.HotelInfo}>
                <div className={style.FirstLine}>
                    <div className={style.Name}>{hotelName}</div>
                    <div className={style.City}>({hotel.city})</div>
                </div>
                <div className={style.SecondLine}>
                    <div className={style.GirisTarihi}>Giriş Tarihi:</div>
                    <div className={style.StartDate}>{start}</div>
                    <div className={style.StartDate}> - </div>
                    <div className={style.GirisTarihi}>Giriş Tarihi:</div>
                    <div className={style.StartDate}>{end}</div>
                    <div className={style.StartDate}> - </div>
                    <div className={style.GirisTarihi}>Yetişkin:</div>
                    <div className={style.StartDate}>{adultSize}</div>
                    <div className={style.StartDate}> - </div>
                    <div className={style.GirisTarihi}>Çocuk:</div>
                    <div className={style.StartDate}>{childSize}</div>
                </div>
            </div>

            <div className={style.RoomType}>
                <div className={style.OdaTipiSecimi}>Oda Tipi Seçimi</div>
                <div className={style.Line} />

                <div className={style.Types}>
                    <label className={style.Label} id='Standart'>
                        <div>{hotel.room_type[0].title}</div>
                        <input hidden id='Standart' type='radio' name='roomType' />
                        <img className={style.TypeImage} src={hotel.room_type[0].photo} name='Standart' onClick={selectingRoomType} alt='typeImg' />
                        <div>{dayDiff} gün, {adultSize} kişi - {hotel.room_type[0].price * dayDiff * adultSize} TL</div>
                    </label>
                    <label className={style.Label} id='Deluxe'>
                        <div>{hotel.room_type[1].title}</div>
                        <input hidden id='Deluxe' type='radio' name='roomType' />
                        <img className={style.TypeImage} src={hotel.room_type[1].photo} name='Deluxe' onClick={selectingRoomType} alt='typeImg' />
                        <div>{dayDiff} gün, {adultSize} kişi - {hotel.room_type[1].price * dayDiff * adultSize} TL</div>
                    </label>
                    <label className={style.Label} id='Suit'>
                        <div>{hotel.room_type[2].title}</div>
                        <input hidden id='Suit' type='radio' name='roomType' />
                        <img className={style.TypeImage} src={hotel.room_type[2].photo} name='Suit' onClick={selectingRoomType} alt='typeImg' />
                        <div>{dayDiff} gün, {adultSize} kişi - {hotel.room_type[2].price * dayDiff * adultSize} TL</div>
                    </label>
                </div>


                <div className={style.OdaTipiSecimi}>Manzara Seçimi</div>
                <div className={style.Line} />

                <div className={style.Scenic}>
                    <label className={style.Label} id='Kara Manzaralı'>
                        <div>{hotel.room_scenic[0].title}</div>
                        <input hidden id='Kara Manzaralı' type='radio' name='scenic' />
                        <img className={style.TypeImage} src={hotel.room_scenic[0].photo} name='Kara Manzaralı' onClick={selectingLandscape} alt='typeImg' />
                        <div>Fiyata Etki Oranı +{hotel.room_scenic[0].price_rate}%</div>
                    </label>
                    <label className={style.Label} id='Havuz Manzaralı'>
                        <div>{hotel.room_scenic[1].title}</div>
                        <input hidden id='Havuz Manzaralı' type='radio' name='scenic' />
                        <img className={style.TypeImage} src={hotel.room_scenic[1].photo} name='Havuz Manzaralı' onClick={selectingLandscape} alt='typeImg' />
                        <div>Fiyata Etki Oranı +{hotel.room_scenic[1].price_rate}%</div>
                    </label>
                    <label className={style.Label} id='Deniz Manzaralı'>
                        <div>{hotel.room_scenic[2].title}</div>
                        <input hidden id='Deniz Manzaralı' type='radio' name='scenic' />
                        <img className={style.TypeImage} src={hotel.room_scenic[2].photo} name='Deniz Manzaralı' onClick={selectingLandscape} alt='typeImg' />
                        <div>Fiyata Etki Oranı +{hotel.room_scenic[2].price_rate}%</div>
                    </label>
                </div>
            </div>
            <div className={style.Buttons}>
                <div>
                    <Button className={style.Back} onClick={clickToBack}>Geri</Button>
                    <Button className={style.SaveAndContinue} onClick={clickToSaveAndContinue}>Kaydet ve Devam Et</Button>
                </div>
            </div>
        </div>
    );
}

export default RoomType;