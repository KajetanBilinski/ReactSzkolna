import React from 'react'
import {Link} from "react-router-dom";
import {getSzkolniakApiCall} from "../../apiCalls/szkolniakApiCalls";
import SzkolniakListTable from "./SzkolniakListTable";
import {withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";


class SzkolniakList extends React.Component {
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
        getSzkolniakApiCall().then(res=>res.json()).then((data)=>
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
        const{error,isLoaded,szkolniaks} = this.state;
        let content;

        if(error)
        {
            content=<p>Błąd: {error.message}</p>
        }
        else if(!isLoaded)
        {
            content=<p>Ładowanie danych szkolniaków...</p>
        }
        else
        {
            content=<SzkolniakListTable szkolList={szkolniaks}/>
        }
        const {t} = this.props;
        return (
            <main>
                <h2>{t('szkol.list.title')}</h2>
                {content}
                {
                    isAuthenticated() &&
                    <Link to="/Szkolniacy/add" className="button-add">{t('szkol.list.addNew')}</Link>
                }
            </main>
        )
    }

}

export default withTranslation()(SzkolniakList);