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

        let sectionBg = {};
        if (this.state.imageLoaded) {
             sectionBg = {
                background: `linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url( https://image.tmdb.org/t/p/original/${this.props.backdrop})`,
                width: '100%',
                height: 'calc(1000px * .5625)',
                position: 'relative'
            }
        }

        if (!this.state.imageLoaded) {
            sectionBg = {
                backgroundColor: '#f5f5f5',
                backgroundSize: 'cover',
                width: '100%',
                height: 'calc(1000px * .5625)',
                position: 'relative'
            }
        }

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
                    <section className={loadingSection.join(' ')} style={sectionBg}>
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