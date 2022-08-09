import React from "react";
import {Link} from "react-router-dom";
import {withTranslation,useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";
function SlownikListTableRow (props)
{
    const slowo = props.slowoData;
    const {t} = useTranslation()
    return (
        <tr>
            <td>{slowo.Polski}</td>
            <td>{slowo.Bombaski}</td>
            {
                isAuthenticated() &&
                <td>
                    <ul className="list-actions">
                        <li>
                            <Link to={`/Slownik/edit/${parseInt(slowo.idSlowo)}`} className="list-actions-button-edit">{t('buttons.edit')}</Link>
                        </li>
                        <li>
                            <Link to={`/Slownik/delete/${parseInt(slowo.idSlowo)}`} className="list-actions-button-delete">{t('buttons.delete')}</Link>
                        </li>
                    </ul>
                </td>
            }
        </tr>
    )
}
export default withTranslation()(SlownikListTableRow);