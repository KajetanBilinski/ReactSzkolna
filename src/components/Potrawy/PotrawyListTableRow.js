import React from "react";
import {Link} from "react-router-dom";
import {useTranslation,withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function PotrawyListTableRow (props)
{
    const potrawa = props.potrawyData;
    const {t} = useTranslation();
    return (
        <tr>
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
                            <Link to={`/Potrawy/edit/${parseInt(potrawa.idPotrawa)}`} className="list-actions-button-edit">{t('Potrawy.buttons.edit')}</Link>
                        </li>
                        <li>
                            <Link to={`/Potrawy/delete/${parseInt(potrawa.idPotrawa)}`} className="list-actions-button-delete">{t('Potrawy.buttons.delete')}</Link>
                        </li>
                    </ul>
                </td>
            }

        </tr>
    )
}
export default withTranslation()(PotrawyListTableRow);