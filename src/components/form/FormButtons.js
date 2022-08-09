import React from "react";
import {Link} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {useTranslation,withTranslation} from "react-i18next";
function FormButtons(props)
{
    const {t}= useTranslation()
    const submitButtonLabel = props.formMode===formMode.NEW ? t('form.actions.add'):props.formMode===formMode.EDIT ? t('form.actions.edit'):t('auth.zaloguj');

    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{props.error}</p>
            <input className="button-add" type="submit" value={submitButtonLabel}/>
            <Link to={props.cancelPath} className="button-cancel">{t('form.actions.cancel')}</Link>
        </div>
    )
}

export default withTranslation()(FormButtons);