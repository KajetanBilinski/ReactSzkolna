import React from "react";
import {getFormattedDate} from "../../helpers/dataHelper";
import {Link} from "react-router-dom";
import {withTranslation,useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function SzkolniakDetailsData(props)
{
    const szkol = props.szkolData
    console.log(szkol)
    const {t} = useTranslation();
    return (
        <React.Fragment>
            <form className="form">

                <label htmlFor="Imie">{t('szkol.fields.Imie')}:</label>
                <input type="text" name="Imie" id="Imie" value={szkol.szkol.Imie}  disabled={true} required/>
                <label htmlFor="Nazwisko">{t('szkol.fields.Nazwisko')}:</label>
                <input type="text" name="Nazwisko" id="Nazwisko" value={szkol.szkol.Nazwisko} disabled={true}  required/>
                <label htmlFor="DataUrodzenia">{t('szkol.fields.DataUrodzenia')}:</label>
                <input type="date" name="DataUrodzenia" id="DataUrodzenia" value={szkol.szkol.DataUrodzenia} disabled={true}  required/>
                <label htmlFor="Zdjecie">{t('szkol.fields.Zdjecie')}:</label>
                <input type="text" name="Zdjecie" id="Zdjecie" value={szkol.szkol.Zdjecie} disabled={true}  required/>

            </form>
            <h2> {t('szkol.Details.Afery.title1')} </h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('Afery.fields.Nazwa')}</th>
                    <th>{t('Afery.fields.Opis')}</th>
                    <th>{t('Afery.fields.Data')}</th>
                    <th>{t('Afery.fields.Link')}</th>
                    {
                        isAuthenticated() &&
                        <th>{t('Afery.fields.Akcje')}</th>
                    }
                </tr>
                </thead>
                <tbody>
                {szkol.Afery.map(afera=>
                    <tr key={afera.idAfera}>
                        <td>{afera.Nazwa}</td>
                        <td>{afera.Opis}</td>
                        <td>{getFormattedDate(afera.Data)}</td>
                        <td>{afera.Link}</td>
                        { isAuthenticated() &&
                            <td>
                                <ul className="list-actions">
                                    <li>
                                        <Link to={`/Szkolniacy/deleteAfera/${szkol.idSzkolniak}/${afera.idAfera}`} className="list-actions-button-delete">{t('buttons.delete')}</Link>
                                    </li>
                                </ul>
                            </td>
                        }

                    </tr>
                )}
                </tbody>
            </table>
            <h2> {t('szkol.Details.Potrawy.title1')} </h2>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('Potrawy.fields.Nazwa')}</th>
                    <th>{t('Potrawy.fields.Opis')}</th>
                    <th>{t('Potrawy.fields.Skladniki')}</th>
                    <th>{t('Potrawy.fields.Czas')}</th>
                    <th>{t('Potrawy.fields.Kcal')}</th>
                    {
                        isAuthenticated() &&
                        <th>{t('Potrawy.fields.Akcje')}</th>
                    }
                </tr>
                </thead>
                <tbody>
                {szkol.Potrawy.map(potrawa=>
                    <tr key={potrawa.idPotrawa}>
                        <td>{potrawa.Nazwa}</td>
                        <td>{potrawa.Opis}</td>
                        <td>{potrawa.Skladniki}</td>
                        <td>{potrawa.Czas}</td>
                        <td>{potrawa.Kcal}</td>
                        {
                            isAuthenticated() &&
                            <td>
                                <ul className="list-actions">
                                    <li>
                                        <Link to={`/Szkolniacy/deletePotrawa/${szkol.idSzkolniak}/${potrawa.idPotrawa}`} className="list-actions-button-delete">{t('buttons.delete')}</Link>
                                    </li>
                                </ul>
                            </td>
                        }
                    </tr>
                )}
                </tbody>
            </table>
            <h4> {t('szkol.Details.Afery.title2')} </h4>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('Afery.fields.Nazwa')}</th>
                    <th>{t('Afery.fields.Opis')}</th>
                    {
                        isAuthenticated() &&
                        <th>{t('Afery.fields.Akcje')}</th>
                    }
                </tr>
                </thead>
                <tbody>
                {szkol.AntyAfery.map(antyAfera=>
                    <tr key={antyAfera.idAfera}>
                        <td>{antyAfera.Nazwa}</td>
                        <td>{antyAfera.Opis}</td>
                        {
                            isAuthenticated() &&
                            <td>
                                <ul className="list-actions">
                                    <li>
                                        <Link to={`/Szkolniacy/addAfera/${szkol.idSzkolniak}/${antyAfera.idAfera}`} className="list-actions-button-details">{t('form.actions.add')}</Link>
                                    </li>
                                </ul>
                            </td>
                        }

                    </tr>
                )}
                </tbody>
            </table>
            <h4> {t('szkol.Details.Potrawy.title2')} </h4>
            <table className="table-list">
                <thead>
                <tr>
                    <th>{t('Potrawy.fields.Nazwa')}</th>
                    <th>{t('Potrawy.fields.Opis')}</th>
                    {
                        isAuthenticated() &&
                        <th>{t('Potrawy.fields.Akcje')}</th>
                    }
                </tr>
                </thead>
                <tbody>
                {szkol.AntyPotrawy.map(antyPotrawa=>
                    <tr key={antyPotrawa.idPotrawa}>
                        <td>{antyPotrawa.Nazwa}</td>
                        <td>{antyPotrawa.Opis}</td>
                        {
                            isAuthenticated() &&
                            <td>
                                <ul className="list-actions">
                                    <li>
                                        <Link to={`/Szkolniacy/addPotrawa/${szkol.idSzkolniak}/${antyPotrawa.idPotrawa}`} className="list-actions-button-details">{t('form.actions.add')}</Link>
                                    </li>
                                </ul>
                            </td>
                        }
                    </tr>
                )}
                </tbody>
            </table>
        </React.Fragment>
    )
}
export default withTranslation()(SzkolniakDetailsData);