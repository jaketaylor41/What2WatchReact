import React, { Component } from 'react';
import classes from './Poster.css';
import Aux from '../../../hoc/Aux/Aux';


class Poster extends Component {

    state = {
        imageLoaded: false
    }

    setImageLoaded = () => {
        this.setState({imageLoaded: true});
    }

    render () {

        const loadImageClasses = [];
        if (!this.state.imageLoaded) {
            loadImageClasses.push(classes.PosterLoading);
        }
        if (this.state.imageLoaded) {
            loadImageClasses.push(classes.PosterContainer);
        }

        const wrapperClasses = [];
        if (!this.state.imageLoaded) {
            wrapperClasses.push(classes.LoadingWrapper);
        }
        if (this.state.imageLoaded) {
            wrapperClasses.push(classes.DivWrapper);
        }

        const loadingSection = [];
        if (!this.state.imageLoaded) {
            loadingSection.push(classes.LoadingSection);
        }
        if (this.state.imageLoaded) {
            loadingSection.push(classes.Section);
        }


        return (
            <Aux>
                <div className={classes.ShuffleDiv}>
                    <section>
                        <div className={loadingSection.join(' ')}> 
                            <img src={'https://image.tmdb.org/t/p/original/' + this.props.backdrop}
                                    className={classes.Backdrop}
                                    style={{visibility: this.state.imageLoaded ? 'visible' : 'hidden'}}
                                    alt="missing poster"
                                    onLoad={this.setImageLoaded}
                                    />
                        </div>
                        <div className={wrapperClasses.join(' ')}>
                            <div className={loadImageClasses.join(' ')} onClick={this.props.clicked}>
                                <div className={classes.PosterWrapper}>
                                    <img src={'https://image.tmdb.org/t/p/original/' + this.props.poster}
                                        className={classes.Poster}
                                        style={{visibility: this.state.imageLoaded ? 'visible' : 'hidden'}}
                                        alt="missing poster"
                                        onLoad={this.setImageLoaded}
                                    />
                                    <div className={classes.Overlay}></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Aux>
                
            );
        }
    }

export default Poster;