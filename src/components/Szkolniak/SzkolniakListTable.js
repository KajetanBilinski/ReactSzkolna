import React from "react";
import SzkolniakListTableRow from "./SzkolniakListTableRow";
import {withTranslation,useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";
function SzkolniakListTable(props)
{
    const szkolniaks = props.szkolList;
    const {t} = useTranslation();
    return (
        <table className="table-list">
            <thead>
                <tr>
                        <th>{t('szkol.fields.Imie')}</th>
                        <th>{t('szkol.fields.Nazwisko')}</th>
                        <th>{t('szkol.fields.DataUrodzenia')}</th>
                        <th>{t('szkol.fields.Zdjecie')}</th>
                        <th>{t('szkol.fields.Akcje')}</th>
                </tr>
            </thead>
            <tbody>
                {
                    szkolniaks.map(szkol=>
                        <SzkolniakListTableRow szkolData={szkol} key={parseInt(szkol.idSzkolniak)}/>
                    )
                }
            </tbody>
        </table>
    )

}
export default withTranslation()(SzkolniakListTable);