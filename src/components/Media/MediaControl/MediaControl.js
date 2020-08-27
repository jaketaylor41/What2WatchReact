import React, { Component } from 'react';
import classes from './MediaControl.css';

class MovieControl extends Component {


    render () {

        return (

            <div className={classes.ButtonContainer}>
                <div className={classes.ButtonDiv}>
                    <div className={classes.InvisibleLeft}> 

                    </div>
                    <div className={classes.CenterButton}>
                        <button
                            className={classes.ShuffleButton}
                            onClick={this.props.toggleMovie}><i className={"fa fa-random"}></i>
                        </button>
                    </div>
                    <div className={classes.RightButton}>
                        <button
                            className={classes.WatchListBtn}
                            onClick={this.props.addToList}
                            disabled={this.props.disabled}>
                            <i
                            style={this.props.added && this.props.disabled ? {color: '#008000'} : null}
                            className={this.props.added && this.props.disabled ? 'fa fa-check' : 'fa fa-list' }
                            ><span>{this.props.added && this.props.disabled ? 'Saved' : 'Save'}</span></i>
                        </button>
                    </div>
                </div>
            </div>

        );
    }
}

export default MovieControl;