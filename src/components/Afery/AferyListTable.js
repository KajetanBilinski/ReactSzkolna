import React from "react";
import AferyListTableRow from "./AferyListTableRow";
import {withTranslation,useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function AferaListTable(props)
{
    const aferas = props.aferaList;
    const {t} = useTranslation();
    return (
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
            {
                aferas.map(afera=>
                    <AferyListTableRow aferaData={afera} key={parseInt(afera.idAfera)}/>
                )
            }
            </tbody>
        </table>
    )

}
export default withTranslation()(AferaListTable);