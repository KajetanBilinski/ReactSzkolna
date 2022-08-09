import React from "react";
import {useTranslation, withTranslation} from "react-i18next";

function MainContent()
{
    const {t} = useTranslation();
    return (
        <main>
            <h2> {t('main-page.content')} </h2>
            <p> {t('main-page.Uniwersum')}</p>
            <h4>{t('main-page.Belweder')}</h4>
            <img src= "/img/belweder.jpg" alt="belweder" width="500" height="350"/>
        </main>
    )
}

export default withTranslation() (MainContent);