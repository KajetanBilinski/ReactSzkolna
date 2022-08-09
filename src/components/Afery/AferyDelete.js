import React from "react";
import {Link} from "react-router-dom";
import {deleteAferaApiCall} from "../../apiCalls/aferaApiCalls";
import {withTranslation} from "react-i18next";



class AferaDelete extends React.Component
{
    constructor(props)
    {
        super(props);
        let {aferaId} = this.props.match.params
        this.state =
            {
                aferaId:aferaId,
                afera:null,
                error:null,
                isLoaded:false,
                message:null
            }
    }
    componentDidMount()
    {
        this.fetchDeleteAfera();
    }

    fetchDeleteAfera = () =>
    {
        deleteAferaApiCall(this.state.aferaId).then(res=>res.json()).then((data)=>
            {
                console.log(data);
                if(data.message)
                {
                    this.setState(
                        {
                            afera:null,
                            message:data.message
                        })
                }
                else
                {
                    this.setState({

                        afera:data,
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
        const {afera,error,isLoaded,message} = this.state;
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
        const {t} = this.props;
        return (
            <main>
                {message}
                <div className="section-buttons">
                    <Link to="/Afery" className="list-actions-button-details">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }


}
export default withTranslation()(AferaDelete);