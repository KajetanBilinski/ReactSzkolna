import React from "react";
import SamochodyListTableRow from "./SamochodyListTableRow";
import {withTranslation,useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";
function SamochodyListTable(props)
{
    const {t} = useTranslation()
    const sams = props.samList;
    return (
        <table className="table-list">
            <thead>
            <tr>
                <th>{t('Samochody.fields.Nazwa')}</th>
                <th>{t('Samochody.fields.Kondycja')}</th>
                <th>{t('Samochody.fields.Rocznik')}</th>
                <th>{t('Samochody.fields.Rejestracja')}</th>
                <th>{t('Samochody.fields.Zdjecie')}</th>
                {
                    isAuthenticated() &&
                    <th>{t('Samochody.fields.Akcje')}</th>
                }
            </tr>
            </thead>
            <tbody>
            {
                sams.map(sam=>
                    <SamochodyListTableRow samData={sam} key={parseInt(sam.idSamochod)}/>
                )
            }
            </tbody>
        </table>
    )

}
export default withTranslation()(SamochodyListTable);