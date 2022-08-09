import React from "react";
import {Link} from "react-router-dom";

import {deleteSamochodApiCall} from "../../apiCalls/samochodyApiCalls";
import {withTranslation} from "react-i18next";



class SamochodDelete extends React.Component
{
    constructor(props)
    {
        super(props);
        let {SamochodId} = this.props.match.params
        console.log(SamochodId)
        this.state =
            {
                SamochodId:SamochodId,
                sam:null,
                error:null,
                isLoaded:false,
                message:null
            }
    }
    componentDidMount()
    {
        this.fetchSamDelete();
    }

    fetchSamDelete = () =>
    {

        deleteSamochodApiCall(this.state.SamochodId).then(res=>res.json()).then((data)=>
            {

                if(data.message)
                {
                    this.setState(
                        {
                            sam:null,
                            message:data.message
                        })
                }
                else
                {
                    this.setState({

                        sam:data,
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
        const {sam,error,isLoaded,message} = this.state;
        let content;
        if(error)
        {
            content = <p>Błąd : {error.message}</p>
        }
        else if(!isLoaded)
        {
            content = <p>Trwa usuwanie samochodu</p>
        }
        else
        {
            content = <p>{message}</p>
        }
        const {t} = this.props;
        return (
            <main>
                {content}
                <div className="section-buttons">
                    <Link to="/Samochody" className="list-actions-button-details">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }


}
export default withTranslation()(SamochodDelete);