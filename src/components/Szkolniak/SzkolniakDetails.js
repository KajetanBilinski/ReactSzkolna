import React from "react";
import {Link} from "react-router-dom";

import {getSzkolniakandAfera} from "../../apiCalls/szkolniakApiCalls";
import SzkolniakDetailsData from "./SzkolniakDetailsData";
import {withTranslation} from "react-i18next";



class SzkolniakDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        let szkolId = this.props.match.params.szkolId
        console.log(szkolId)
        this.state =
            {
                szkolId:szkolId,
                szkol:null,
                error:null,
                isLoaded:false,
                message:null
            }
    }
    componentDidMount()
    {

        this.fetchSzkolDetails();
    }

    fetchSzkolDetails = () =>
    {
        getSzkolniakandAfera(this.state.szkolId).then(res=>res.json()).then((data)=>
            {
                if(data.message)
                {
                    this.setState(
                        {
                                szkol:null,
                                message:data.message
                        })
                }
                else
                {
                    this.setState({

                        szkol:data,
                        message:null
                    })
                }
                this.setState({
                    isLoaded:true
                })

            },
            (error)=>
            {
                this.setState({
                    isLoaded:true,
                    error
                })
            })
    }

    render()
    {
        const {szkol,error,isLoaded,message} = this.state;
        let content;

        if(error)
        {
            content = <p>Błąd : {error.message}</p>
        }
        else if(!isLoaded)
        {
            content = <p>Ładowanie szczegółowych danych szkolniaka</p>
        }
        else if(message)
        {
            content = <p>{message}</p>
        }
        else
        {
            szkol.idSzkolniak=this.state.szkolId;
            content = <SzkolniakDetailsData szkolData={szkol}/>
        }
        const {t} = this.props;
        return (
            <main>
                <h2>{t('szkol.list.details')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/Szkolniacy" className="list-actions-button-details">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }

}
export default withTranslation()(SzkolniakDetails);