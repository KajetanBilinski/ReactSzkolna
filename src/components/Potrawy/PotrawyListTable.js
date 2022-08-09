import React from "react";
import PotrawyListTableRow from "./PotrawyListTableRow";
import {useTranslation,withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";
function PotrawyListTable(props)
{
    const potrawy = props.potrawyList;
    const {t} = useTranslation()
    return (
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
            {
                potrawy.map(potrawa=>
                    <PotrawyListTableRow potrawyData={potrawa} key={parseInt(potrawa.idPotrawa)}/>
                )
            }
            </tbody>
        </table>
    )

}
export default withTranslation() (PotrawyListTable);