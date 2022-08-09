import React from "react";
import {Link} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {addAferaApiCall, editAferaApiCall, getAferaByIdApiCall} from "../../apiCalls/aferaApiCalls"
import {checkRequired, checkTextLengthRange, checkNumbers, checkDate} from "../../helpers/validateCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {Redirect} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {formValidationsKeys} from "../../helpers/formValidationsKeys";

class AferyForm extends React.Component {

    constructor(props)
    {
        super(props);
        const paramsAferaId=this.props.match.params.aferaId;
        const currentFormMode= paramsAferaId ? formMode.EDIT : formMode.NEW;
        console.log(currentFormMode)
        this.state =
            {
                aferaId:paramsAferaId,
                afera:
                    {
                        idAfera:'',
                        Nazwa:'',
                        Opis:'',
                        Data:'',
                        Link:''
                    },
                errors:
                    {
                        Nazwa:'',
                        Opis:'',
                        Data:'',
                        Link:''
                    },
                formMode:currentFormMode,
                redirect:false,
                error:null
            }
    }
    componentDidMount()
    {

        if(this.state.formMode==='EDIT')
            this.fetchAferaData()
    }
    handleChange = (event) => {
        const {name, value } = event.target;
        const afera = { ...this.state.afera};
        afera[name] = value;

        const errorMessage = this.validateField(name,value);
        const errors = {...this.state.errors};
        errors[name]=errorMessage;
        this.setState({
            afera: afera,
        })
    }

    validateForm = () =>
    {
        const afera=this.state.afera;
        const errors=this.state.errors;

        for(const fieldName in afera)
        {
            const fieldValue = afera[fieldName];
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

        if(fieldName === 'Nazwa') {
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationsKeys.notEmpty;
            } else if (!checkTextLengthRange(fieldValue, 3, 40)) {
                errorMessage = formValidationsKeys.len_3_40;
            }
        }
        if( fieldName === 'Data') {
            if(!checkRequired(fieldValue)){
                errorMessage=formValidationsKeys.notEmpty;
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
                afera = this.state.afera,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {

                promise = addAferaApiCall(afera)

            } else if (currentFormMode === formMode.EDIT) {
                const idAfera = parseInt(this.state.aferaId);
                promise = editAferaApiCall(idAfera, afera)
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

    fetchAferaData = () =>
    {
        getAferaByIdApiCall(this.state.aferaId).then(res=>res.json()).then((data)=>
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



    render() {
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nową aferę' : 'Pomyślnie zaktualizowano aferę'
            return (
                <Redirect to={{
                    pathname: "/Afery/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const {t} = this.props;
        const errorsSummary = this.hasErrors() ? t('erorrs.formsErr') : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('Afery.buttons.addForm') : t('Afery.buttons.editForm')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('Afery.fields.Nazwa')}
                        required
                        error={this.state.errors.Nazwa}
                        name="Nazwa"
                        onChange={this.handleChange}
                        value={this.state.afera.Nazwa}
                    />
                    <FormInput
                        type="text"
                        label={t('Afery.fields.Opis')}
                        error={this.state.errors.Opis}
                        name="Opis"
                        onChange={this.handleChange}
                        value={this.state.afera.Opis}
                    />
                    <FormInput
                        type="date"
                        label={t('Afery.fields.Data')}
                        required
                        error={this.state.errors.Data}
                        name="Data"
                        onChange={this.handleChange}
                        value={this.state.afera.Data}
                    />
                    <FormInput
                        type="text"
                        label={t('Afery.fields.Link')}
                        name="Link"
                        error={this.state.errors.Link}
                        onChange={this.handleChange}
                        value={this.state.afera.Link}
                    />

                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/Afery"
                    />
                </form>
            </main >
        )
    }
}

export default withTranslation()(AferyForm);