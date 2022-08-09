import React from 'react'
import {Link} from "react-router-dom";
import {getSlowaApiCall} from "../../apiCalls/slownikApiCalls";
import SlownikListTable from "./SlownikListTable";
import {withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";


class SlownikList extends React.Component {
    constructor(props) {
        super(props);
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : '';
        this.state =
            {
                error:null,
                isLoaded:false,
                szkolniaks:[],
                notice: notice
            }
    }
    componentDidMount() {
        this.fetchSzkolList();
    }

    fetchSzkolList = () =>
    {
        getSlowaApiCall().then(res=>res.json()).then((data)=>
            {
                this.setState(
                    {
                        isLoaded:true,
                        szkolniaks:data
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
        const {t} = this.props;
        const{error,isLoaded,szkolniaks} = this.state;
        let content;

        if(error)
        {
            content=<p>Błąd: {error.message}</p>
        }
        else if(!isLoaded)
        {
            content=<p>Ładowanie słów...</p>
        }
        else
        {
            content=<SlownikListTable slowoData={szkolniaks}/>
        }
        return (
            <main>
                <h2> {t('Slownik.title')}</h2>
                {content}
                {
                    isAuthenticated() &&
                    <Link to="/Slownik/add" className="button-add">{t('Slownik.fields.add')}</Link>
                }

            </main>
        )
    }

}

export default withTranslation()(SlownikList);