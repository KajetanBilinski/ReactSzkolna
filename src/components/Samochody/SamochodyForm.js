import React from "react";
import {Link} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {addSamochodApiCall, editSamochodApiCall, getSamochodyByIdApiCall} from "../../apiCalls/samochodyApiCalls"
import {checkRequired, checkTextLengthRange, checkNumbers} from "../../helpers/validateCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {Redirect} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {formValidationsKeys} from "../../helpers/formValidationsKeys";
class SamochodForm extends React.Component {

    constructor(props)
    {
        super(props);
        const paramsSamId=this.props.match.params.SamochodId;
        const currentFormMode= paramsSamId ? formMode.EDIT : formMode.NEW;
        console.log(currentFormMode)
        this.state =
            {
                samId:paramsSamId,
                sam:
                    {
                        idSamochod:'',
                        Nazwa:'',
                        KondycjaSprzegla:'',
                        Rocznik:'',
                        Rejestracja:'',
                        Zdjecie:'',
                        idBio:1
                    },
                errors:
                    {
                        Nazwa:'',
                        KondycjaSprzegla:'',
                        Rocznik:'',
                        Rejestracja:'',
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
            this.fetchSamData()
    }
    handleChange = (event) => {
        const {name, value } = event.target;
        const sam = { ...this.state.sam};
        sam[name] = value;

        const errorMessage = this.validateField(name,value);
        const errors = {...this.state.errors};
        errors[name]=errorMessage;
        this.setState({
            sam: sam,
        })
    }

    validateForm = () =>
    {
        const sam=this.state.sam;
        const errors=this.state.errors;

        for(const fieldName in sam)
        {
            const fieldValue = sam[fieldName];
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

        if(fieldName === 'Nazwa') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 3, 40)) {
                errorMessage = formValidationsKeys.len_3_40;
            }
        }
        if(fieldName === 'KondycjaSprzegla')
            if (!checkRequired(fieldValue))
                errorMessage = formValidationsKeys.notEmpty;

        if(fieldName === 'Rocznik') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            } else if(!checkNumbers(fieldValue))
                errorMessage = formValidationsKeys.numberErr;
            else if (!checkTextLengthRange(fieldValue, 4, 4)) {
                errorMessage = formValidationsKeys.len_4_4;
            }
        }

        if(fieldName === 'Rejestracja') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 5, 8)) {
                errorMessage = formValidationsKeys.len_5_8;
            }
        }

        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid=this.validateForm();
        console.log(isValid)
        if(isValid)
        {
            const
                sam = this.state.sam,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {

                promise = addSamochodApiCall(sam)

            } else if (currentFormMode === formMode.EDIT) {
                const idSam = parseInt(this.state.samId);
                promise = editSamochodApiCall(idSam, sam)
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

    fetchSamData = () =>
    {
        getSamochodyByIdApiCall(this.state.samId).then(res=>res.json()).then((data)=>
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



    render() {
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowy powóz' : 'Pomyślnie zaktualizowano powóz'
            return (
                <Redirect to={{
                    pathname: "/Samochody/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const {t}=this.props;
        const errorsSummary = this.hasErrors() ? t('erorrs.formsErr') : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('Samochody.buttons.addForm') : t('Samochody.buttons.editForm')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message


        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('Samochody.fields.Nazwa')}
                        required
                        error={this.state.errors.Nazwa}
                        name="Nazwa"
                        onChange={this.handleChange}
                        value={this.state.sam.Nazwa}
                    />
                    <FormInput
                        type="text"
                        label={t('Samochody.fields.Kondycja')}
                        required
                        error={this.state.errors.KondycjaSprzegla}
                        name="KondycjaSprzegla"
                        onChange={this.handleChange}
                        value={this.state.sam.KondycjaSprzegla}
                    />
                    <FormInput
                        type="text"
                        label={t('Samochody.fields.Rocznik')}
                        required
                        error={this.state.errors.Rocznik}
                        name="Rocznik"
                        onChange={this.handleChange}
                        value={this.state.sam.Rocznik}
                    />
                    <FormInput
                        type="text"
                        label={t('Samochody.fields.Rejestracja')}
                        name="Rejestracja"
                        required
                        error={this.state.errors.Rejestracja}
                        onChange={this.handleChange}
                        value={this.state.sam.Rejestracja}
                    />

                    <FormInput
                        type="text"
                        label={t('Samochody.fields.Zdjecie')}
                        name="Zdjecie"
                        error={this.state.errors.Zdjecie}
                        onChange={this.handleChange}
                        value={this.state.sam.Zdjecie}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/Samochody"
                    />
                </form>
            </main >
        )
    }
}

export default withTranslation()(SamochodForm);