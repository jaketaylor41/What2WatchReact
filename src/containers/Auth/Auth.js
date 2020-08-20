import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import classes from './Auth.css';
import LoginForm from '../../components/UI/AuthForms/LoginForm/LoginForm';
import RegForm from '../../components/UI/AuthForms/RegForm/RegForm';


class Auth extends Component {

    state = {
        controls: {
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
        isSignup: false
        
    }


    checkValidity (value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        // if (rules.required) {
        //     isValid = value.trim() !== '' && isValid;
        // }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        // if (rules.maxLength) {
        //     isValid = value.length <= rules.maxLength && isValid
        // }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        // if ( rules.isNumeric ) {
        //     const pattern = /^\d+$/;
        //     isValid = pattern.test( value ) && isValid
        // }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        if (this.state.controls.valid === true && this.state.controls.valid === true) {
            this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
        } else {
            alert("Invalid Inputs")
        }
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }
        console.log(this.checkValidity())
        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                label={formElement.config.elementConfig.placeholder}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )}
            />
        ));


        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error}</p>
            );
        }

        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (

            <div>
                {!this.state.isSignup ? 
                <LoginForm submit={this.submitHandler} register={this.switchAuthModeHandler}>
                {authRedirect}
                {errorMessage}
                {form}
                </LoginForm>
                :
                <RegForm submit={this.submitHandler} login={this.switchAuthModeHandler}>
                {authRedirect}
                {errorMessage}
                {form}
                </RegForm>}
            </div>

            // <div className={classes.Auth}>
            //     {authRedirect}
            //     {errorMessage}
            //     <form onSubmit={this.submitHandler}>
            //         {form}
            //         <button>Sign In</button>
            //     </form>

            //     <button onClick={this.switchAuthModeHandler}>
            //         SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
            //     </button>

            // </div>


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
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup) ),
        onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect( mapStateToProps, mapDispatchToProps) (Auth);