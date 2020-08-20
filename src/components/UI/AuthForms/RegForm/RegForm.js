import React, {Component} from 'react';
import classes from './RegForm.css';

class RegForm extends Component {

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
                                            <h1>Create account</h1>
                                                {this.props.children}

                                            <div className={classes.RegButtonDiv}>
                                                <button>Create your account</button>
                                            </div>

                                            <div className={classes.Divider}>
                                                <hr />
                                            </div>

                                            <div className={classes.Already}>
                                            Already have an account? <a onClick={this.props.login}>Sign In</a>
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



export default RegForm;