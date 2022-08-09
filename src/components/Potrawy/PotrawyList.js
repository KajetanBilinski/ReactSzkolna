import React from 'react'
import {Link} from "react-router-dom";
import PotrawyListTable from "./PotrawyListTable";
import {getPotrawyApiCall} from "../../apiCalls/potrawyApiCalls";
import {withTranslation,useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

class PotrawyList extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                error:null,
                isLoaded:false,
            }
    }
    componentDidMount() {
        this.fetchPotrawyList();
    }

    fetchPotrawyList = () =>
    {
        getPotrawyApiCall().then(res=>res.json()).then((data)=>
            {
                this.setState(
                    {
                        isLoaded:true,
                        potrawy:data
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
        const{error,isLoaded,potrawy} = this.state;
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
            content=<PotrawyListTable potrawyList={potrawy}/>
        }
        const {t}=this.props;
        return (
            <main>
                <h2> {t('Potrawy.title')}</h2>
                { content}
                {
                    isAuthenticated() &&
                    <Link to="/Potrawy/add" className="button-add">{t('Potrawy.buttons.add')}</Link>
                }

            </main>

        )
    }
}

export default withTranslation()(PotrawyList);