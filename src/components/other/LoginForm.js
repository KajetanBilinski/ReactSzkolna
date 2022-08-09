import React from "react";
import {loginApiCall} from "../../apiCalls/authApiCalls";
import {checkRequired} from "../../helpers/validateCommon";
import {formValidationsKeys} from "../../helpers/formValidationsKeys";
import {useTranslation, withTranslation} from "react-i18next";
import {Redirect} from "react-router-dom";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";

class LoginForm extends React.Component
{
    constructor(props) {
        super(props);
        this.state =
            {
                user:
                    {
                        login:'',
                        password:''
                    },
                errors:
                    {
                        login:'',
                        password:''
                    },
                error:'',
                message:'',
                prevPath:'/index',
                redirect:false
            }
    }

    handleChange = (event) => {
        const {name, value } = event.target;
        const user = { ...this.state.user};
        user[name] = value;

        const errorMessage = this.validateField(name,value);
        const errors = {...this.state.errors};
        errors[name]=errorMessage;
        this.setState({
            user: user,
            errors:errors
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid=this.validateForm();
        const {t} = this.props;
        if(isValid)
        {
            const user = this.state.user

            let response;
           loginApiCall(user).then(res=>
           {
               response = res
               return res.json();
           }).then(data=>
           {
               if (response.status === 200)
               {
                   if(data.token)
                   {
                       const userString=JSON.stringify(data);
                       this.props.handleLogin(userString);
                       this.state.redirect=true;
                   }
               } else if(response.status === 401)
               {
                   console.log(401);
                   this.setState({message:t('erorrs.loginErr')});
               }
               else
                   console.log(response.status);
           },
               (error)=>
               {
                   this.setState(
                       {
                           isLoaded:true,
                           error
                       })

               })
            }
    }
    validateField = (fieldName, fieldValue) => {
        let errorMessage='';

        if(fieldName === 'login') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            }
        }

        if(fieldName === 'password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            }
        }

        return errorMessage
    }
    validateForm = () =>
    {
        const user=this.state.user;
        const errors=this.state.errors;

        for(const fieldName in user)
        {
            const fieldValue = user[fieldName];
            const errorMessage = this.validateField(fieldName,fieldValue)
            errors[fieldName] = errorMessage;
        }
        this.setState(
            {
                errors:errors
            }
        )
        return !this.hasErrors();
    }
    hasErrors = () =>
    {
        const errors = this.state.errors;

        for (const errorField in this.state.errors)
        {
            if(errors[errorField].length > 0)
                return true;
        }
        return false;
    }

    render()
    {
        const {t} = this.props;
        const errorsSummary = this.hasErrors() ? t('erorrs.formsErr') : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''

        const globalErrorMessage = errorsSummary || fetchError || this.state.message
        const { redirect } = this.state
        if(redirect)
        {
            console.log("Weszło");
            return (
                <Redirect to={{
                    pathname: "/index/"
                }} />
            )
        }
            return (
                <main>
                    <div id="login">
                        <h2>{t('auth.log-in')}</h2>
                        <form className="form" method="post" onSubmit={this.handleSubmit}>
                            <FormInput
                                name="login"
                                value={this.state.user.login}
                                error={this.state.errors.login}
                                label={t('auth.login')}
                                onChange={this.handleChange}
                                type="text"
                            />
                            <FormInput
                                name="password"
                                value={this.state.user.password}
                                error={this.state.errors.password}
                                label={t('auth.password')}
                                onChange={this.handleChange}
                                type="password"
                            />

                            <FormButtons
                                cancelPath={this.state.prevPath}
                                error={globalErrorMessage}
                                submitButtonLabel={t('auth.zaloguj')}
                            />

                        </form>
                    </div>
                </main>


                )
    }
}

export default withTranslation()(LoginForm);