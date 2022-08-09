import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dataHelper";
import {withTranslation,useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";
function SzkolniakListTableRow (props)
{
    const szkol = props.szkolData
    const {t} = useTranslation();
    return (
        <tr>
                <td>{szkol.Imie}</td>
                <td>{szkol.Nazwisko}</td>
                <td>{szkol.DataUrodzenia ? getFormattedDate(szkol.DataUrodzenia):""}</td>
                <td><img src={`/img/${szkol.Zdjecie}`} width="150" height="150" /></td>
                <td>
                    <ul className="list-actions">
                        <li>
                            <Link to={`/Szkolniacy/details/${parseInt(szkol.idSzkolniak)}`} className="list-actions-button-details" >{t('buttons.details')}</Link>
                        </li>
                        {
                            isAuthenticated() &&
                            <li>
                                <Link to={`/Szkolniacy/edit/${parseInt(szkol.idSzkolniak)}`} className="list-actions-button-edit">{t('buttons.edit')}</Link>
                            </li>
                        }
                        {
                            isAuthenticated() && szkol.idSzkolniak !== 1 &&
                            <li>
                            <Link to={`/Szkolniacy/delete/${parseInt(szkol.idSzkolniak)}`} className="list-actions-button-delete">{t('buttons.delete')}</Link>
                            </li>
                        }
                        {
                            isAuthenticated() && szkol.idSzkolniak === 1 &&
                            <li>
                                <a href="https://youtu.be/SSJvQXvkSJE?t=58" className="list-actions-button-delete">{t('buttons.delete')}</a>
                            </li>
                        }
                    </ul>
                </td>
        </tr>
    )
}
export default withTranslation()(SzkolniakListTableRow);