import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import bgImage from '../../assets/images/moviesBg.jpg';
//import classes from './Auth.css';
import LoginForm from '../../components/UI/AuthForms/LoginForm/LoginForm';
import RegForm from '../../components/UI/AuthForms/RegForm/RegForm';


class Auth extends Component {

    state = {
        loginControls: {  
            email: {
                elementType: 'input',
                elementConfig: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
        },
        regControls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    label: 'Name',
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    match: true
                },
                valid: false,
                touched: false
            },
            verifyPassword: {
                elementType: 'input',
                elementConfig: {
                    label: '',
                    type: 'password',
                    placeholder: 'Re-enter password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    match: true
                },
                valid: false,
                touched: false
            },
        },
        isSignup: false
        
    }


    checkValidity (value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.match) {
            isValid = this.state.regControls.password.value === this.state.regControls.verifyPassword.value && isValid;
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {

        if (!this.state.isSignup){
            const updatedLogControls = {
                ...this.state.loginControls,
                [controlName]: {
                    ...this.state.loginControls[controlName],
                    value: event.target.value,
                    valid: this.checkValidity( event.target.value, this.state.loginControls[controlName].validation ),
                    touched: true
                } 
            };
            this.setState({loginControls: updatedLogControls});
        }

        if (this.state.isSignup) {
            const updatedRegControls = {
                ...this.state.regControls,
                [controlName]: {
                    ...this.state.regControls[controlName],
                    value: event.target.value,
                    valid: this.checkValidity( event.target.value, this.state.regControls[controlName].validation ),
                    touched: true
                }
            };
    
            this.setState({regControls: updatedRegControls});
        }
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        if (this.state.isSignup) {
            this.props.onRegister(
                this.state.regControls.name.value,
                this.state.regControls.email.value,
                this.state.regControls.password.value,
                this.state.isSignup
                );
        }

        if (!this.state.isSignup) {
            this.props.onLogin(
                this.state.loginControls.email.value,
                this.state.loginControls.password.value,
                this.state.isSignup
                );
        }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        const loginFormElementsArray = [];
        for (let key in this.state.loginControls) {
            loginFormElementsArray.push( {
                id: key,
                config: this.state.loginControls[key]
            } );
        }

        const regFormElementsArray = [];
        for (let key in this.state.regControls) {
            regFormElementsArray.push( {
                id: key,
                config: this.state.regControls[key]
            } );
        }
        
        let form = null;

        if (!this.state.isSignup){
            form = loginFormElementsArray.map( formElement => (
               <Input
                   key={formElement.id}
                   label={formElement.config.elementConfig.label}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   inputError={formElement.config.error}
                   shouldValidate={formElement.config.validation}
                   touched={formElement.config.touched}
                   changed={( event ) => this.inputChangedHandler( event, formElement.id )}
               />
           ));
        }

        if (this.state.isSignup){
            form = regFormElementsArray.map( formElement => (
               <Input
                   key={formElement.id}
                   label={formElement.config.elementConfig.label}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   inputError={formElement.config.valid}
                   shouldValidate={formElement.config.validation}
                   touched={formElement.config.touched}
                   changed={( event ) => this.inputChangedHandler( event, formElement.id )}
               />
           ));
        }


        let firebaseError = null;

        if (this.props.error) {
            firebaseError = (
                <p>{this.props.error}</p>
            );
        }
        
        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        const divStyle = {
            background: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url(${bgImage})`,
        }

        return (

            <div style={divStyle}>
                {!this.state.isSignup ? 
                <LoginForm submit={this.submitHandler} register={this.switchAuthModeHandler}>
                {authRedirect}
                {firebaseError}
                {form}
                </LoginForm>
                :
                <RegForm submit={this.submitHandler} login={this.switchAuthModeHandler}>
                {authRedirect}
                {firebaseError}
                {form}
                </RegForm>}
            </div>


        );


    }

}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (name, email, password) => dispatch(actions.register(name, email, password) ),
        onLogin: (email, password) => dispatch(actions.login(email, password) ),
        onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect( mapStateToProps, mapDispatchToProps) (Auth);