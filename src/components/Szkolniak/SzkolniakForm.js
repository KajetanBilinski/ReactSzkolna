import React from "react";
import formMode from "../../helpers/formHelper";
import {addSzkolniakApiCall, editSzkolniakApiCall, getSzkolniakByIdApiCall} from "../../apiCalls/szkolniakApiCalls"
import {checkRequired, checkTextLengthRange, checkDate, checkLetters} from "../../helpers/validateCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {Redirect} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {formValidationsKeys} from "../../helpers/formValidationsKeys"
class SzkolniakForm extends React.Component {

    constructor(props)
    {
        super(props);
        const paramsSzkolId=this.props.match.params.szkolId;
        const currentFormMode= paramsSzkolId ? formMode.EDIT : formMode.NEW;
        console.log(currentFormMode)
        this.state =
            {
                szkolId:paramsSzkolId,
                szkol:
                    {
                        idSzkolniak:'',
                        idBio:1,
                        Imie:'',
                        Nazwisko:'',
                        DataUrodzenia:'',
                        Zdjecie:'',
                        Password:''
                    },
                errors:
                    {
                        Imie:'',
                        Nazwisko:'',
                        DataUrodzenia:'',
                        Password:'',
                        Zdjecie:''
                    },
                formMode:currentFormMode,
                redirect:false,
                error:null
            }
    }
    componentDidMount()
    {

        if(this.state.formMode==='EDIT')
            this.fetchSzkolData()
    }
    handleChange = (event) => {
        const {name, value } = event.target;
        const szkol = { ...this.state.szkol};
        szkol[name] = value;

        const errorMessage = this.validateField(name,value);
        const errors = {...this.state.errors};
        errors[name]=errorMessage;
        this.setState({
            szkol: szkol,
        })
    }

    validateForm = () =>
    {
        const szkol=this.state.szkol;
        const errors=this.state.errors;

        for(const fieldName in szkol)
        {
            const fieldValue = szkol[fieldName];
            const errorMessage = this.validateField(fieldName,fieldValue)
            errors[fieldName] = errorMessage;
        }
        this.setState(
            {
                erorrs:errors
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

    validateField = (fieldName, fieldValue) => {
        let nowDate= new Date(),
            month = '' + (nowDate.getMonth()+1),
            day=''+nowDate.getDate(),
            year=nowDate.getFullYear();

        if(month.length<2)
            month='0'+month;
        if(day.length<2)
            day='0'+day;
        const nowString = [year,month,day].join('-');
        let errorMessage = '';


        if(fieldName === 'Imie') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 3, 20)) {
                errorMessage = formValidationsKeys.len_3_20;
            } else if (!checkLetters(fieldValue))
                errorMessage= formValidationsKeys.alfaErr;
        }

        if(fieldName === 'Nazwisko') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 3, 20)) {
                errorMessage = formValidationsKeys.len_3_20;
            } else if (!checkLetters(fieldValue))
                errorMessage= formValidationsKeys.alfaErr;
        }

        if(fieldName === 'Password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 3, 40)) {
                errorMessage = formValidationsKeys.len_3_40;
            }
        }

        if( fieldName === 'DataUrodzenia') {
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationsKeys.notEmpty;
            }else if(!checkDate(fieldValue, nowString)){
                errorMessage= formValidationsKeys.date;
            }
        }

        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid=this.validateForm();
        if(isValid)
        {
            const
                szkol = this.state.szkol,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {

                promise = addSzkolniakApiCall(szkol)

            } else if (currentFormMode === formMode.EDIT) {
                szkol.idBio=1;
                const idSzkolniak = parseInt(this.state.szkolId);
                promise = editSzkolniakApiCall(idSzkolniak, szkol)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        }).then(
                    (data) => {
                        if (!response.ok && response.status === 500) {
                            console.log(data)
                            for (const i in data) {
                                const errorItem = data[i]
                                const errorMessage = errorItem.message
                                const fieldName = errorItem.path
                                const errors = { ...this.state.errors }
                                errors[fieldName] = errorMessage
                                this.setState({
                                    errors: errors,
                                    error: null
                                })
                            }
                        } else {
                            this.setState({ redirect: true })
                        }
                    },
                    (error) => {
                        this.setState({ error })
                        console.log(error)
                    }
                );
            }
        }


    }

    fetchSzkolData = () =>
    {
        getSzkolniakByIdApiCall(this.state.szkolId).then(res=>res.json()).then((data)=>
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



    render() {
            const { redirect } = this.state
            if (redirect) {
                const currentFormMode = this.state.formMode
                const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowego szkolniaka' : 'Pomyślnie zaktualizowano nowego pracownika'
                return (
                    <Redirect to={{
                        pathname: "/Szkolniacy/",
                        state: {
                            notice: notice
                        }
                    }} />
                )
            }

            const {t} = this.props;
            const errorsSummary = this.hasErrors() ? t('erorrs.formsErr') : ''
            const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
            const pageTitle = this.state.formMode === formMode.NEW ? t('szkol.list.addNew') : t('szkol.list.addNew')

            const globalErrorMessage = errorsSummary || fetchError || this.state.message

            return (
                <main>
                    <h2>{pageTitle}</h2>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <FormInput
                            type="text"
                            label={t('szkol.fields.Imie')}
                            required
                            error={this.state.errors.Imie}
                            name="Imie"
                            onChange={this.handleChange}
                            value={this.state.szkol.Imie}
                        />
                        <FormInput
                            type="text"
                            label={t('szkol.fields.Nazwisko')}
                            required
                            error={this.state.errors.Nazwisko}
                            name="Nazwisko"
                            onChange={this.handleChange}
                            value={this.state.szkol.Nazwisko}
                        />
                        <FormInput
                            type="date"
                            label={t('szkol.fields.DataUrodzenia')}
                            required
                            error={this.state.errors.DataUrodzenia}
                            name="DataUrodzenia"
                            onChange={this.handleChange}
                            value={this.state.szkol.DataUrodzenia}
                        />
                        <FormInput
                            type="text"
                            label={t('szkol.fields.Zdjecie')}
                            name="Zdjecie"
                            error={this.state.errors.Zdjecie}
                            onChange={this.handleChange}
                            value={this.state.szkol.Zdjecie}
                        />

                        <FormInput
                            type={this.state.formMode === formMode.NEW? "password":"hidden"}
                            label={this.state.formMode === formMode.NEW? t('szkol.fields.Haslo'):""}
                            required={this.state.formMode === formMode.NEW? "required":''}
                            name="Password"
                            error={this.state.formMode === formMode.NEW? this.state.errors.Password: ''}
                            onChange={this.handleChange}
                        />
                        <FormButtons
                            formMode={this.state.formMode}
                            error={globalErrorMessage}
                            cancelPath="/Szkolniacy"
                        />
                    </form>
                </main >
            )
        }
}

export default withTranslation()(SzkolniakForm);