import React from 'react'
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

class BioMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render()
    {
        const {t} = this.props;
        return (
            <main>
                <h2> {t('bio.title')} </h2>

                <h4> {t('bio.title1')} </h4>
                <p>
                    {t('bio.OpisField')}
                </p>
                <h4> {t('bio.title2')} </h4>
                <p>
                    {t('bio.ZakresField')}
                </p>
                <Link to="/Samochody" className="button-cancel">{t('bio.details')}</Link>
            </main>
        )
    }

}
export default withTranslation()(BioMain);