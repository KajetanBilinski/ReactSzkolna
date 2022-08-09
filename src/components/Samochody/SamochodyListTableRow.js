import React from "react";
import {Link} from "react-router-dom";
import {withTranslation,useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";
function SamochodyListTableRow (props)
{
    const sam = props.samData;
    const {t} = useTranslation()
    return (
        <tr>
            <td>{sam.Nazwa}</td>
            <td>{sam.KondycjaSprzegla}</td>
            <td>{sam.Rocznik}</td>
            <td>{sam.Rejestracja}</td>
            <td><img src={sam.Zdjecie.replace("Photos","/img")} width="240" height="150"/></td>
            {
                isAuthenticated() &&
                <td>
                    <ul className="list-actions">
                        <li>
                            <Link to={`/Samochody/edit/${parseInt(sam.idSamochod)}`} className="list-actions-button-edit">{t('Samochody.buttons.edit')}</Link>
                        </li>
                        <li>
                            <Link to={`/Samochody/delete/${parseInt(sam.idSamochod)}`} className="list-actions-button-delete">{t('Samochody.buttons.delete')}</Link>
                        </li>
                    </ul>
                </td>
            }
        </tr>
    )
}
export default  SamochodyListTableRow;