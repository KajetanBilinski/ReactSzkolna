import React from "react";
import SlownikListTableRow from "./SlownikListTableRow";
import {withTranslation,useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function SlownikListTable(props)
{
    const slowa = props.slowoData;
    const {t}=useTranslation();
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('Slownik.fields.polski')}</th>
                <th>{t('Slownik.fields.bombaski')}</th>
                {
                    isAuthenticated() &&
                    <th>{t('Slownik.fields.akcje')}</th>
                }

            </tr>
            </thead>
            <tbody>
            {
                slowa.map(slowo=>
                    <SlownikListTableRow slowoData={slowo} key={parseInt(slowo.idSlowo)}/>
                )
            }
            </tbody>
        </table>
    )

}
export default withTranslation()(SlownikListTable);