import React from 'react'
import {withTranslation} from "react-i18next";

class ChoroszczMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render()
    {
        const {t} = this.props;
        return (
            <main>
                <h2> {t('choroszcz.title')} </h2>
                <img src="/img/choroszcz1.jpg" height="1052" width="714" alt="choroszczForm"/>

                <h4> {t('choroszcz.miejsce')} </h4>
                <img src="/img/choroszcz2.png" height="379" width="670" alt="choroszczForm"/>
            </main>
        )
    }

}
export default withTranslation()(ChoroszczMain);