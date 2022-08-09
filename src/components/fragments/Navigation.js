import React from "react";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {isAuthenticated, isBoss} from "../../helpers/authHelper";

class Navigation extends React.Component
{
    handleLanguageChange = (language) =>
    {
        const {i18n} = this.props;
        i18n.changeLanguage(language,(err,t)=>
        {
            if(err) return console.log('Coś poszło nie tak',err);
        });
    }
    render()
    {
        const {t} = this.props;
        const loginLogoutLink = isAuthenticated()?<button onClick={this.props.handleLogout}>{t('auth.wyloguj')}</button> : <Link to="/login">{t('auth.zaloguj')}</Link>
        return (
            <nav>
                <ul>
                    <li><Link to="/index">{t('nav.main-page')}</Link></li>
                    <li><Link to="/Szkolniacy">{t('nav.Szkolniacy')}</Link></li>
                    <li><Link to="/BiuroInterwencjiObywatelskich">{t('nav.Bio')}</Link></li>
                    <li><Link to="/Afery">{t('nav.Afery')}</Link></li>
                    <li><Link to="/Slownik">{t('nav.Slownik')}</Link></li>
                    <li><Link to="/Potrawy">{t('nav.Potrawy')}</Link></li>
                    {
                        isBoss() &&
                        <li><Link to="/Choroszcz">{t('nav.Choroszcz')}</Link></li>
                    }
                    {
                        isBoss() &&
                            <li><a href="https://bialystok.policja.gov.pl/po2/kontakt/kmp/kierownictwo/51380,KOMENDA-MIEJSKA-POLICJI-W-BIALYMSTOKU.html">{t('nav.Zgloszenie')}</a></li>
                    }
                    <li className="lang">{loginLogoutLink}</li>
                    <li className='lang'><button onClick={()=>{this.handleLanguageChange('pl')}}>PL</button></li>
                    <li><button onClick={()=>{this.handleLanguageChange('ar')}}>AR</button></li>
                    <li><button onClick={()=>{this.handleLanguageChange('joor')}}>JOOR</button></li>
                </ul>
            </nav>
        );
    }
}



export default withTranslation() (Navigation);