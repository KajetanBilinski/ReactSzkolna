import React from "react";
import {useTranslation} from "react-i18next";

function Header()
{
    const {t} = useTranslation();
    return (
        <header>
            <h1> {t('main-page.header')} </h1>
            <button className={"button-head"} onClick={()=>{document.getElementById("profilZdjecie").src==="http://localhost:8000/img/profil.jpg" ? document.getElementById("profilZdjecie").src="http://localhost:8000/img/profil1.jpg" : document.getElementById("profilZdjecie").src="http://localhost:8000/img/profil.jpg" }}><img id="profilZdjecie" width="650" height="350" src="/img/profil.jpg" alt="logo"/>
            </button>
        </header>
    );
}

export default Header;
