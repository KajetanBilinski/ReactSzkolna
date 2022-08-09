import React from 'react';
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/fragments/Other";
import Footer from "./components/fragments/footer";
import SzkolniakList from "./components/Szkolniak/SzkolniakList";
import SzkolniakForm from "./components/Szkolniak/SzkolniakForm";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AferyList from "./components/Afery/AferyList";
import BioMain from "./components/BIO/BioMain";
import SamochodyList from "./components/Samochody/SamochodyList";
import SzkolniakDelete from "./components/Szkolniak/SzkolniakDelete"
import SzkolniakDetails from "./components/Szkolniak/SzkolniakDetails";
import SamochodDelete from "./components/Samochody/SamochodyDelete";
import AferyDelete from "./components/Afery/AferyDelete"
import SamochodyForm from "./components/Samochody/SamochodyForm";
import AferyForm from "./components/Afery/AferyForm";
import SzkolniakAferaDelete from "./components/Szkolniak/SzkolniakAferaDelete";
import SzkolniakAddAfera from "./components/Szkolniak/SzkolniakAddAfera";
import SlownikList from "./components/Slownik/SlownikList";
import SlownikForm from "./components/Slownik/SlownikForm";
import PotrawyList from "./components/Potrawy/PotrawyList";
import PotrawyForm from "./components/Potrawy/PotrawyForm";
import SzkolniakAddPotrawa from "./components/Szkolniak/SzkolniakAddPotrawa";
import SzkolniakDeletePotrawa from "./components/Szkolniak/SzkolniakDeletePotrawa";
import PotrawyDelete from "./components/Potrawy/PotrawyDelete";
import SlownikDelete from "./components/Slownik/SlownikDelete";
import LoginForm from "./components/other/LoginForm";
import {getCurrentUser, isBoss,isAuthenticated} from "./helpers/authHelper";
import ChoroszczMain from "./components/Choroszcz/ChoroszczMain";

class App extends React.Component
{

    constructor(props) {
        super(props);
        this.state=
            {
                user:undefined,
                prevPath:''
            }
    }

    handleLogin=(user)=>
    {
        localStorage.setItem("user",user)
        localStorage.setItem("idSzkolniak",user.idSzkolniak)
        this.setState({user:user});
    }
    handleLogout=()=>
    {
        localStorage.removeItem("user");
        this.setState({user:undefined});
    }
    componentDidMount() {
        const currentUser=getCurrentUser();
        this.setState({user:currentUser})
    }

    render()
    {
        return (
            <Router>
                <div>
                    <Header />
                    <Navigation handleLogout={this.handleLogout}/>
                    <Switch>
                        <Route exact path="/index" component={MainContent}/>

                        <Route exact path="/Szkolniacy" component={SzkolniakList}/>
                        {
                            isAuthenticated() &&
                            <Route exact path="/Szkolniacy/add" component={SzkolniakForm}/>
                        }
                        <Route exact path="/Szkolniacy/details/:szkolId" component={SzkolniakDetails}/>
                        {
                            isAuthenticated() &&
                            <Route exact path="/Szkolniacy/edit/:szkolId" component={SzkolniakForm}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Szkolniacy/delete/:szkolId" component={SzkolniakDelete}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Szkolniacy/deleteAfera/:szkolId/:aferaId" component={SzkolniakAferaDelete}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Szkolniacy/addAfera/:szkolId/:aferaId" component={SzkolniakAddAfera}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Szkolniacy/addPotrawa/:szkolId/:idPotrawa" component={SzkolniakAddPotrawa}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Szkolniacy/deletePotrawa/:szkolId/:idPotrawa" component={SzkolniakDeletePotrawa}/>
                        }

                        <Route exact path="/Afery" component={AferyList}/>
                        {
                            isAuthenticated() &&
                            <Route exact path="/Afery/add" component={AferyForm}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Afery/edit/:aferaId" component={AferyForm}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Afery/delete/:aferaId" component={AferyDelete}/>
                        }
                        <Route exact path="/BiuroInterwencjiObywatelskich" component={BioMain}/>
                        <Route exact path="/Samochody" component={SamochodyList}/>
                        {
                            isAuthenticated() &&
                            <Route exact path="/Samochody/add" component={SamochodyForm}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Samochody/edit/:SamochodId" component={SamochodyForm}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Samochody/delete/:SamochodId" component={SamochodDelete}/>
                        }
                        <Route exact path="/Slownik" component={SlownikList}/>
                        {
                            isAuthenticated() &&
                            <Route exact path="/Slownik/add" component={SlownikForm}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Slownik/edit/:idSlowo" component={SlownikForm}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Slownik/delete/:idSlowo" component={SlownikDelete}/>
                        }

                        <Route exact path="/Potrawy" component={PotrawyList}/>
                        {
                            isAuthenticated() &&
                            <Route exact path="/Potrawy/add" component={PotrawyForm}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Potrawy/edit/:idPotrawa" component={PotrawyForm}/>
                        }
                        {
                            isAuthenticated() &&
                            <Route exact path="/Potrawy/delete/:idPotrawa" component={PotrawyDelete}/>
                        }
                        <Route exact path="/login" render={(props)=> (<LoginForm handleLogin={this.handleLogin}/>)}/>

                        {
                            isBoss() &&
                            <Route exact path="/Choroszcz" component={ChoroszczMain}/>
                        }

                    </Switch>
                    <Footer />
                </div>
            </Router>
        )
    }

}

export default App;