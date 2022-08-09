import React from "react";
import {Link} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {checkRequired, checkTextLengthRange, checkNumbers, checkLetters} from "../../helpers/validateCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {Redirect} from "react-router-dom";
import {addSlowaApiCall, editSlowaApiCall, getSlowoApiCall} from "../../apiCalls/slownikApiCalls";
import {withTranslation} from "react-i18next";
import {formValidationsKeys} from "../../helpers/formValidationsKeys";

class SlownikForm extends React.Component {

    constructor(props)
    {
        super(props);
        const paramsSlowoId=this.props.match.params.idSlowo;
        const currentFormMode= paramsSlowoId ? formMode.EDIT : formMode.NEW;
        console.log(currentFormMode)
        this.state =
            {
                idSlowo:paramsSlowoId,
                slowo:
                    {
                        idSlowo:'',
                        Polski:'',
                        Bombaski:''
                    },
                errors:
                    {
                        Polski:'',
                        Bombaski:''
                    },
                formMode:currentFormMode,
                redirect:false,
                error:null
            }
    }
    componentDidMount()
    {

        if(this.state.formMode==='EDIT')
            this.fetchSlowoData()
    }
    handleChange = (event) => {
        const {name, value } = event.target;
        const slowo = { ...this.state.slowo};
        slowo[name] = value;

        const errorMessage = this.validateField(name,value);
        const errors = {...this.state.errors};
        errors[name]=errorMessage;
        this.setState({
            slowo: slowo,
        })
    }

    validateForm = () =>
    {
        const slowo=this.state.slowo;
        const errors=this.state.errors;

        for(const fieldName in slowo)
        {
            const fieldValue = slowo[fieldName];
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

        if (fieldName === 'Polski') {
            if (!checkRequired(fieldValue)) {
                errorMessage= formValidationsKeys.notEmpty;
            } else if (!checkLetters(fieldValue)) {
                errorMessage= formValidationsKeys.alfaErr;
            }
        }
        if (fieldName === 'Bombaski') {
            if (!checkRequired(fieldValue)) {
                errorMessage= formValidationsKeys.notEmpty;
            } else if (!checkLetters(fieldValue)) {
                errorMessage= formValidationsKeys.alfaErr;
            }
        }
        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid=this.validateForm();
        console.log(isValid)
        if(isValid)
        {
            const
                slowo = this.state.slowo,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {

                promise = addSlowaApiCall(slowo)

            } else if (currentFormMode === formMode.EDIT) {
                const idSlowo = parseInt(this.state.idSlowo);
                promise = editSlowaApiCall(idSlowo, slowo)
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

    fetchSlowoData = () =>
    {
        getSlowoApiCall(this.state.idSlowo).then(res=>res.json()).then((data)=>
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



    render() {
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowe słowo' : 'Pomyślnie zaktualizowano słowo'
            return (
                <Redirect to={{
                    pathname: "/Slownik/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const {t} = this.props;
        const errorsSummary = this.hasErrors() ? t('erorrs.formsErr') : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('Slownik.form.addForm') : t('Slownik.form.editForm')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('Slownik.form.polski')}
                        required
                        error={this.state.errors.Polski}
                        name="Polski"
                        onChange={this.handleChange}
                        value={this.state.slowo.Polski}
                    />
                    <FormInput
                        type="text"
                        label={t('Slownik.form.bombaski')}
                        required
                        error={this.state.errors.Bombaski}
                        name="Bombaski"
                        onChange={this.handleChange}
                        value={this.state.slowo.Bombaski}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/Slownik"
                    />
                </form>
            </main >
        )
    }
}

export default withTranslation()(SlownikForm);