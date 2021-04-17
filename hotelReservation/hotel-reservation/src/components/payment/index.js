import React, { useEffect, useState } from 'react';
import style from './index.module.scss';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { selectName, selectNumber, selectMonth, selectYear, selectCvv } from '../../store/actions/payment';
import { getCouponCode, postReservation } from '../../api';
import CreditCart from '../../static/images/creditCard.jpg';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

function Payment() {
    const [codes, setCodes] = useState([]);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [code, setCode] = useState(null);

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const { dayDiff, priceRate, total, unitPrice } = location.state;
    const { hotelName, hotel, startDate, endDate, adultSize, childSize } = useSelector(state => state.HotelReducer);
    const { roomType, landscape } = useSelector(state => state.RoomReducer);
    const { name, number, month, year, cvv} = useSelector(state => state.PaymentReducer);

    const start = Moment(startDate).format('YYYY-MM-DD');
    const end = Moment(endDate).format('YYYY-MM-DD');
    const totalPrice = total.toFixed(2)
    const fixedTotalDiscount = totalDiscount.toFixed(2);
    const fixedPriceRate = priceRate.toFixed(2);

    useEffect(() => {
        const couponCode = getCouponCode();
        couponCode.then(code => setCodes(code));
        setTotalDiscount(total);
    }, []);

    const enteringName = e => {
        const input = e.target.value;
        dispatch(selectName(input));
    }

    const enteringNumber = e => {
        let input = e.target.value;
        if (!Number(input)) {
            e.target.value = '';
            alert('Lütfen yalnızca rakam giriniz!');
        } else {
            dispatch(selectNumber(input));
        }
    }

    const selectingMonth = e => {
        const input = e.target.value;
        dispatch(selectMonth(input));
    }

    const selectingYear = e => {
        const input = e.target.value;
        dispatch(selectYear(input));
    }

    const enteringCvv = e => {
        let input = e.target.value;
        if (!Number(input)) {
            e.target.value = '';
            alert('Lütfen yalnızca rakam giriniz!');
        } else {
            dispatch(selectCvv(input));
        }
    }

    const checkingCode = () => {
        const enteredCode = document.getElementById('couponInput').value;
        const filteredCode = Object.values(codes).filter(c => c.code === enteredCode);
        setCode(filteredCode[0]);
        
        if (filteredCode.length > 0) {
            const expirationStr = (filteredCode[0].expiration_at);
            const expiration = new Date(expirationStr).getTime();
            const now = Date.now();
            if (expiration - now > 0) {
                const newPrice = total - filteredCode[0].discount_ammount;
                setDiscount(filteredCode[0].discount_ammount);
                setTotalDiscount(newPrice);
            }
        }
    }

    const clickToBack = () => {
        history.push('/roomtype');
    }

    const clickToPayAndFinish = () => {
        if(name !== '' && number !== 0 && month !== 0 && year !== 0 && cvv !== 0){
            const infos = {
                "hotel_id": hotel.hotel_id,
                "start_date": start,
                "end_date": end,
                "adult": adultSize,
                "child": childSize,
                "room_type": roomType,
                "room_scenic": landscape,
                "price": fixedTotalDiscount,
                "coupon_code": code.code,
                "card_name": name,
                "card_number": number,
                "card_date_month": month,
                "card_date_year": year,
                "card_cvv": cvv
            }
            postReservation(infos);
            history.push('/complete', { total, unitPrice, dayDiff, priceRate, code });
        } else {
            alert('Bir sonraki adıma geçmek için Kart Üzerindeki İsim, Kartın Numarası, Kart Son Kullanma Tarihi ve CVV zorunludur.')
        }
    }

    return (
        <div>
            <div className={style.container}>
                <div className={style.leftSide}>
                    <img className={style.CreditCartImage} src={CreditCart} alt='CreditCardImg' />
                    <fieldset className={style.CreditCartInfo}>
                        <legend>Kredi Kartı Bilgileri</legend>
                        <br />
                        <div>Kartın Üzerindeki İsim</div>
                        <InputGroup>
                            <FormControl className={style.cartInfoInput} onChange={enteringName} placeholder='Kartın Üzerindeki İsmi Giriniz' />
                        </InputGroup>
                        <br />
                        <div>Kartın Numarası</div>
                        <InputGroup>
                            <FormControl className={style.cartInfoInput} onChange={enteringNumber} placeholder='Kartın Numarasını Giriniz' />
                        </InputGroup>
                        <br />
                        <div className={style.DateAndCVV}>
                            <div>
                                <div>Kart Son Kullanma Tarihi</div>
                                <select onChange={selectingMonth}>
                                    <option>Ay</option>
                                    <option>Ocak</option>
                                    <option>Şubat</option>
                                    <option>Mart</option>
                                    <option>Nisan</option>
                                    <option>Mayıs</option>
                                    <option>Haziran</option>
                                    <option>Temmuz</option>
                                    <option>Ağustos</option>
                                    <option>Eylül</option>
                                    <option>Ekim</option>
                                    <option>Kasım</option>
                                    <option>Aralık</option>
                                </select>
                                <select onChange={selectingYear}>
                                    <option>Yıl</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                    <option>2026</option>
                                    <option>2027</option>
                                    <option>2028</option>
                                    <option>2029</option>
                                    <option>2030</option>
                                    <option>2031</option>
                                    <option>2032</option>
                                    <option>2033</option>
                                    <option>2034</option>
                                    <option>2035</option>
                                </select>
                            </div>
                            <div className={style.CVV}>
                                <div>CVV</div>
                                <InputGroup>
                                    <FormControl onChange={enteringCvv} placeholder='CVV Giriniz' />
                                </InputGroup>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className={style.RightSide}>
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
                    <div className={style.CouponCodeBox}>
                        <InputGroup>
                            <FormControl className={style.CouponCodeInput} id='couponInput' placeholder='Kupon Kodu' />
                        </InputGroup>
                        <Button onClick={checkingCode} className={style.CouponCodeButton}>Kodu Kullan</Button>
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
                            <div className={style.TotalPrice}>{totalPrice} TL</div>
                        </div>
                        <div className={style.CouponLine}>
                            <div className={style.Indirim}>İndirim</div>
                            <div className={style.CouponCode}>(Kupon Kodu)</div>
                            <div className={style.Discount}>-{discount} TL</div>
                        </div>
                    </div>
                    <div className={style.TotalPriceBox}>
                        <div className={style.ToplamTutar}>Toplam Tutar</div>
                        <div className={style.TotalPrice}>{fixedTotalDiscount} TL</div>
                    </div>
                </div>

            </div>
            <div className={style.Buttons}>
                <div>
                    <Button className={style.Back} onClick={clickToBack}>Geri</Button>
                    <Button className={style.PayAndFinish} onClick={clickToPayAndFinish}>Ödeme Yap ve Bitir</Button>
                </div>
            </div>
        </div>
    );
}

export default Payment;