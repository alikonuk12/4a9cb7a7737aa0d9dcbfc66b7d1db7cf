import React from 'react';
import style from './index.module.scss';
import { Button } from 'react-bootstrap';

function NavBar() {
    return (
        <div className={style.Navbar}>
            <div className={style.leftSide}>
                <div className={style.otel}>Otel</div>
                <div className={style.rezervasyon}>Rezervasyon Sistemi</div>
            </div>
            <div className={style.rightSide}>
                <Button className={style.rezervasyonButton}>Yeni Rezervasyon Yap</Button>
            </div>
        </div>
    );
}

export default NavBar;