import React from 'react'
import {Link} from "react-router-dom";
import {getAferaApiCall} from "../../apiCalls/aferaApiCalls";
import AferyListTable from "./AferyListTable";
import {withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

class AferyList extends React.Component {
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
        this.fetchAferaList();
    }

    fetchAferaList = () =>
    {
        getAferaApiCall().then(res=>res.json()).then((data)=>
            {
                this.setState(
                    {
                        isLoaded:true,
                        afery:data
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
        const{error,isLoaded,afery} = this.state;
        let content;

        if(error)
        {
            content=<p>Błąd: {error.message}</p>
        }
        else if(!isLoaded)
        {
            content=<p>Ładowanie danych afer...</p>
        }
        else
        {
            content=<AferyListTable aferaList={afery}/>
        }
        const {t} = this.props;
        return (
            <main>
                <h2>{t('Afery.title')}</h2>
                { content}
                {
                    isAuthenticated() &&
                    <Link to="/Afery/add" className="button-add">{t('Afery.buttons.add')}</Link>
                }

            </main>

        )
    }
}

export default withTranslation()(AferyList);