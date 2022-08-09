import React from 'react'
import {Link} from "react-router-dom";
import {getSamochodyApiCall} from "../../apiCalls/samochodyApiCalls";
import SamochodyListTable from "./SamochodyListTable";
import {withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

class SamochodyList extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                error:null,
                isLoaded:false,
                afery:[]
            }
    }
    componentDidMount() {
        this.fetchSamochodyList();
    }

    fetchSamochodyList = () =>
    {
        getSamochodyApiCall().then(res=>res.json()).then((data)=>
            {
                this.setState(
                    {
                        isLoaded:true,
                        sams:data
                    }
                )
            },
            (error)=>
            {
                this.setState(
                    {
                        isLoaded:true,
                        error
                    }
                )
            })
    }
    render()
    {
        const{error,isLoaded,sams} = this.state;
        let content;

        if(error)
        {
            content=<p>Błąd: {error.message}</p>
        }
        else if(!isLoaded)
        {
            content=<p>Ładowanie danych samochodów...</p>
        }
        else
        {
            content=<SamochodyListTable samList={sams}/>
        }
        const {t} = this.props;
        return (
            <main>
                <h2> {t('Samochody.title')}</h2>
                { content}
                {
                    isAuthenticated() &&
                    <Link to="/Samochody/add" className="button-add">{t('Samochody.buttons.add')}</Link>
                }
            </main>

        )
    }
}

export default withTranslation()(SamochodyList);