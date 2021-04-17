import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHotel, selectStartDate, selectEndDate, selectAdultSize, selectChildSize } from '../../store/actions/hotel';
import { useHistory } from "react-router-dom";
import style from './index.module.scss';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getHotels, getHotelDetails } from '../../api';
import CalendarIcon from '../../static/images/calendar.jpg';


function HotelAndDate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { hotel, hotelName, startDate, endDate, adultSize, childSize } = useSelector(state => state.HotelReducer);

    const [hotels, setHotels] = useState([]);
    const [hotelDetails, setDetails] = useState([]);

    useEffect(() => {
        getHotels().then(hotels => setHotels(hotels));
        getHotelDetails().then(hotelDetails => setDetails(hotelDetails));
    }, []);

    const checkingAdultNumber = e => {
        let input = e.target.value;
        if (!Number(input)) {
            e.target.value = '';
            alert('Lütfen geçerli bir sayı giriniz!');
        }

        if (hotel.max_adult_size) {
            if (input > hotel.max_adult_size) {
                e.target.value = hotel.max_adult_size;
                alert('Maksimum yetişkin kapasitemiz ' + hotel.max_adult_size + "'dir");
            } else {
                dispatch(selectAdultSize(e.target.value));
            }
        } else {
            if (input > 5) {
                e.target.value = 5;
                alert("Maksimum yetişkin kapasitemiz 5'dir");
            } else {
                dispatch(selectAdultSize(e.target.value));
            }
        }
    }

    const checkingChildNumber = e => {
        let input = e.target.value;
        if (input > 5) {
            e.target.value = 5;
            alert("Maksimum çocuk kapasitemiz 5'dir");
        }
        dispatch(selectChildSize(e.target.value));
    }

    const selectingStartDate = date => {
        if (endDate) {
            if (endDate >= date) {
                dispatch(selectStartDate(date));
            } else {
                alert('Giriş tarihi çıkış tarihinden büyük olamaz!');
            }
        } else {
            dispatch(selectStartDate(date));
        }
    }

    const selectingEndDate = date => {
        if (startDate) {
            if (startDate <= date) {
                dispatch(selectEndDate(date));
            } else {
                alert('Çıkış tarihi giriş tarihinden küçük olamaz!');
            }
        } else {
            dispatch(selectEndDate(date));
        }
    }

    const selectingHotel = () => {
        if (document.getElementById('hotelList').value !== '0') {
            let index = document.getElementById('hotelList').value - 1;
            dispatch(selectHotel(hotelDetails[index], hotels[index].hotel_name));
        }
    }

    const saveAndContinue = () => {
        if (hotel.id && startDate && endDate && adultSize !== 0) {


            history.push('/roomtype', { hotelName: hotelName });
        } else {
            alert('Otel seçimi, giriş tarihi, çıkış tarihi ve yetişkin sayısı alanları zorunludur.');
        }
    }

    return (
        <div className={style.container}>
            <br />
            <div className={style.SubContainer}>
                <select id='hotelList' onChange={selectingHotel} className={style.HotelList}>
                    <option value='0'>Rezervasyon yapmak istediğiniz oteli seçiniz.</option>
                    {
                        hotels.map((value) => { return <option key={value.id} value={value.id}>{value.hotel_name}</option> })
                    }
                </select>

                <div className={style.DateAndPersonNumber}>
                    <div className={style.Box}>
                        <div>Giriş Tarihi</div>
                        <DatePicker selected={startDate} onChange={date => selectingStartDate(date)} />
                        <img src={CalendarIcon} alt="CalendarIcon" className={style.CalendarIcon} />
                    </div>

                    <div className={style.Box}>
                        <div>Çıkış Tarihi</div>
                        <DatePicker selected={endDate} onChange={date => selectingEndDate(date)} />
                        <img src={CalendarIcon} alt="CalendarIcon" className={style.CalendarIcon} />
                    </div>

                    <div className={style.Box}>
                        <div>Yetişkin Sayısı</div>
                        <InputGroup><FormControl defaultValue={adultSize} onChange={checkingAdultNumber} /></InputGroup>
                    </div>

                    <div className={style.Box}>
                        <div>Çocuk Sayısı</div>
                        <InputGroup><FormControl defaultValue={childSize} onChange={checkingChildNumber} disabled={hotel.id && !hotel.child_status} /></InputGroup>
                        {hotel.id && !hotel.child_status ? 'Çocuk ziyaretçi kabul edilmiyor!' : null}
                    </div>
                </div>
            </div>
            <br />
            <div className={style.BottomSide}>
                <Button onClick={saveAndContinue} className={style.KaydetVeDevam}>Kaydet ve Devam Et</Button>
            </div>
        </div>
    );
}

export default HotelAndDate;