import React from "react";
import {Link} from "react-router-dom";

import {deleteSzkolniakApiCall} from "../../apiCalls/szkolniakApiCalls";
import {withTranslation} from "react-i18next";



class SzkolniakDelete extends React.Component
{
    constructor(props)
    {
        super(props);
        let {szkolId} = this.props.match.params;
        console.log(szkolId);
        console.log(parseInt(szkolId));
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
        this.fetchSzkolDelete();
    }

    fetchSzkolDelete = () =>
    {
        deleteSzkolniakApiCall(this.state.szkolId).then(res=>res.json()).then((data)=>
            {
                console.log(data);
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
            content = <p>Trwa usuwanie szkolniaka</p>
        }
        else
        {
            content = <p>{message}</p>
        }
        const {t}=this.props;
        return (
            <main>
                {content}
                <div className="section-buttons">
                    <Link to="/Szkolniacy" className="list-actions-button-details">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }


}
export default withTranslation() (SzkolniakDelete);