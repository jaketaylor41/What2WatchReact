import React, { Component } from 'react';
import classes from './Poster.css';


class Poster extends Component {

    state = {
        imageLoaded: false
    }

    componentWillUnmount () {
        console.log("Unmounted..");
    }

    setImageLoaded = () => {
        this.setState({imageLoaded: true});
    }

    render () {


        return (
            <div>
                <div className={classes.ImageWrapper}>
                    <img src={'https://image.tmdb.org/t/p/original/' + this.props.backdrop}
                        className={classes.Backdrop}
                        alt="missing poster"
                        style={{visibility: this.state.imageLoaded ? 'visible' : 'hidden'}}
                        onLoad={this.setImageLoaded}
                    />
                    <div className={classes.PosterContainer}>
                        <div className={classes.OverlayContainer} onClick={this.props.clicked}>
                            <div className={classes.Overlay}></div>
                                <img src={'https://image.tmdb.org/t/p/original/' + this.props.poster}
                                    className={classes.Poster}
                                    style={{visibility: this.state.imageLoaded ? 'visible' : 'hidden'}}
                                    alt="missing poster"
                                    onLoad={this.setImageLoaded}
                                />
                        </div>
                    </div>
                </div>
            </div>
                
            );
        }
    }

export default Poster;