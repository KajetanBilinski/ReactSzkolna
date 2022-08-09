import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dataHelper";
import {withTranslation,useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function AferaListTableRow (props)
{
    const {t} = useTranslation()
    const afera = props.aferaData
    return (
        <tr>
            <td>{afera.Nazwa}</td>
            <td>{afera.Opis}</td>
            <td>{afera.Data ? getFormattedDate(afera.Data):""}</td>
            <td><a href={afera.Link}>{afera.Link}</a></td>
            {
                isAuthenticated() &&
                <td>
                    <ul className="list-actions">
                        <li>
                            <Link to={`/Afery/edit/${parseInt(afera.idAfera)}`} className="list-actions-button-edit">{t('Afery.buttons.edit')}</Link>
                        </li>
                        <li>
                            <Link to={`/Afery/delete/${parseInt(afera.idAfera)}`} className="list-actions-button-delete">{t('Afery.buttons.delete')}</Link>
                        </li>
                    </ul>
                </td>
            }

        </tr>
    )
}
export default withTranslation()(AferaListTableRow);