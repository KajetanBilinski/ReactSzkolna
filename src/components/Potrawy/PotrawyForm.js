import React from "react";
import formMode from "../../helpers/formHelper";
import {checkRequired, checkTextLengthRange, checkNumbers} from "../../helpers/validateCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {Redirect} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {addPotrawyApiCall, editPotrawyApiCall, getPotrawyByIdApiCall} from "../../apiCalls/potrawyApiCalls";
import {formValidationsKeys} from "../../helpers/formValidationsKeys";

class PotrawyForm extends React.Component {

    constructor(props)
    {
        super(props);
        const paramsPotrawaId=this.props.match.params.idPotrawa;
        const currentFormMode= paramsPotrawaId ? formMode.EDIT : formMode.NEW;
        console.log(currentFormMode)
        this.state =
            {
                idPotrawa:paramsPotrawaId,
                potrawa:
                    {
                        idPotrawa:'',
                        Nazwa:'',
                        Opis:'',
                        Skladniki:'',
                        Czas:'',
                        Kcal:'',
                        idSzkolniak:''
                    },
                errors:
                    {
                        Nazwa:'',
                        Opis:'',
                        Skladniki:'',
                        Czas:'',
                        Kcal:'',
                        idSzkolniak:''
                    },
                formMode:currentFormMode,
                redirect:false,
                error:null
            }
    }
    componentDidMount()
    {

        if(this.state.formMode==='EDIT')
            this.fetchPotrawaData()
    }
    handleChange = (event) => {
        const {name, value } = event.target;
        const potrawa = { ...this.state.potrawa};
        potrawa[name] = value;

        const errorMessage = this.validateField(name,value);
        const errors = {...this.state.errors};
        errors[name]=errorMessage;
        this.setState({
            potrawa: potrawa,
        })
    }

    validateForm = () =>
    {
        const potrawa=this.state.potrawa;
        const errors=this.state.errors;


        for(const fieldName in potrawa)
        {
            const fieldValue = potrawa[fieldName];
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

        let errorMessage = '';
        const {t} = this.props;
        if(fieldName === 'Nazwa') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 1, 50)) {
                errorMessage = formValidationsKeys.len_1_50;
            }
        }
        if(fieldName === 'Opis') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 1, 500)) {
                errorMessage = formValidationsKeys.len_1_500;
            }
        }

        if(fieldName === 'Skladniki') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 1, 500)) {
                errorMessage = formValidationsKeys.len_1_500;
            }
        }

        if(fieldName === 'Czas') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 1, 8)) {
                errorMessage = formValidationsKeys.len_1_8;
            }else if (!checkNumbers(fieldValue)) {
                errorMessage = formValidationsKeys.numberErr;
            }
        }

        if(fieldName === 'Kcal') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 1, 8)) {
                errorMessage = formValidationsKeys.len_1_8;
            }else if (!checkNumbers(fieldValue)) {
                errorMessage = formValidationsKeys.numberErr;
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
                potrawa = this.state.potrawa,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {

                promise = addPotrawyApiCall(potrawa)

            } else if (currentFormMode === formMode.EDIT) {
                const idPotrawa = parseInt(this.state.idPotrawa);
                promise = editPotrawyApiCall(idPotrawa, potrawa)
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

    fetchPotrawaData = () =>
    {
        getPotrawyByIdApiCall(this.state.idPotrawa).then(res=>res.json()).then((data)=>
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



    render() {
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowe danie' : 'Pomyślnie zaktualizowano danie'
            return (
                <Redirect to={{
                    pathname: "/Potrawy/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const {t}= this.props;
        const errorsSummary = this.hasErrors() ? t('erorrs.formsErr') : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('Potrawy.buttons.addForm') : t('Potrawy.buttons.editForm')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('Potrawy.fields.Nazwa')}
                        required
                        error={this.state.errors.Nazwa}
                        name="Nazwa"
                        onChange={this.handleChange}
                        value={this.state.potrawa.Nazwa}
                    />
                    <FormInput
                        type="text"
                        label={t('Potrawy.fields.Opis')}
                        required
                        error={this.state.errors.Opis}
                        name="Opis"
                        onChange={this.handleChange}
                        value={this.state.potrawa.Opis}
                    />
                    <FormInput
                        type="text"
                        label={t('Potrawy.fields.Skladniki')}
                        required
                        error={this.state.errors.Skladniki}
                        name="Skladniki"
                        onChange={this.handleChange}
                        value={this.state.potrawa.Skladniki}
                    />
                    <FormInput
                        type="text"
                        label={t('Potrawy.fields.Czas')}
                        name="Czas"
                        required
                        error={this.state.errors.Czas}
                        onChange={this.handleChange}
                        value={this.state.potrawa.Czas}
                    />

                    <FormInput
                        type="text"
                        label={t('Potrawy.fields.Kcal')}
                        name="Kcal"
                        required
                        error={this.state.errors.Kcal}
                        onChange={this.handleChange}
                        value={this.state.potrawa.Kcal}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/Potrawy"
                    />
                </form>
            </main >
        )
    }
}

export default withTranslation() (PotrawyForm);