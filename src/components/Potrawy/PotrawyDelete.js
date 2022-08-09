import React from "react";
import {Link} from "react-router-dom";

import {withTranslation} from "react-i18next";
import {deletePotrawyApiCall} from "../../apiCalls/potrawyApiCalls";


class PotrawyDelete extends React.Component
{
    constructor(props)
    {
        super(props);
        let {idPotrawa} = this.props.match.params
        console.log(idPotrawa)
        this.state =
            {
                idPotrawa:idPotrawa,
                potrawa:null,
                error:null,
                isLoaded:false,
                message:null
            }
    }
    componentDidMount()
    {
        this.fetchPotrawaDelete();
    }

    fetchPotrawaDelete = () =>
    {

        deletePotrawyApiCall(this.state.idPotrawa).then(res=>res.json()).then((data)=>
            {

                if(data.message)
                {
                    this.setState(
                        {
                            potrawa:null,
                            message:data.message
                        })
                }
                else
                {
                    this.setState({

                        potrawa:data,
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
            content = <p>Trwa usuwanie potrawy</p>
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
                    <Link to="/Potrawy" className="list-actions-button-details">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }


}
export default withTranslation()(PotrawyDelete);