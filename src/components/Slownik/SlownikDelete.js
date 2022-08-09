import React from "react";
import {Link} from "react-router-dom";

import {deleteSamochodApiCall} from "../../apiCalls/samochodyApiCalls";
import {withTranslation} from "react-i18next";
import {deleteSlowaApiCall, deleteSlowoApiCall} from "../../apiCalls/slownikApiCalls";



class SlownikDelete extends React.Component
{
    constructor(props)
    {
        super(props);
        let {idSlowo} = this.props.match.params
        console.log(idSlowo)
        this.state =
            {
                idSlowo:idSlowo,
                slowo:null,
                error:null,
                isLoaded:false,
                message:null
            }
    }
    componentDidMount()
    {
        this.fetchSlowoDelete();
    }

    fetchSlowoDelete = () =>
    {

        deleteSlowoApiCall(this.state.idSlowo).then(res=>res.json()).then((data)=>
            {

                if(data.message)
                {
                    this.setState(
                        {
                            slowo:null,
                            message:data.message
                        })
                }
                else
                {
                    this.setState({

                        slowo:data,
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
                    <Link to="/Slownik" className="list-actions-button-details">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }


}
export default withTranslation()(SlownikDelete);