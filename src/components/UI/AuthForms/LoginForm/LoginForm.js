import React, { Component } from 'react';
import classes from './LoginForm.css';

class LoginForm extends Component {

    render () {
        return (
            <div className={classes.Section}>
                <div className={classes.CenterSection}>
                    <div className={classes.MainSection}>
                        <div className={classes.RegSection}>
                            <div className={classes.FormContainer}>
                                <form onSubmit={this.props.submit}>
                                    <div className={classes.FormBox}>
                                        <div className={classes.FormInner}>
                                            <h1>Sign In</h1>
                                                {this.props.children}

                                            <div className={classes.LoginButtonDiv}>
                                                <button>Sign In</button>
                                            </div>

                                            <div className={classes.Divider}>
                                                <hr />
                                            </div>

                                            <div className={classes.Already}>
                                            New to W2W? <a onClick={this.props.register}>Create your account</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default LoginForm;