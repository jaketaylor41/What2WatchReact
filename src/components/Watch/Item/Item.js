import React, { Component } from 'react';
import classes from './Item.css';


class Item extends Component {

    state = {
        imageLoaded: false
    }

    setImageLoaded = () => {
        this.setState({imageLoaded: true});
    }


    render () {
        return (
                <div className={classes.PosterContainer} onClick={this.props.clicked}>
                    <img
                    className={classes.Poster}
                    src={'https://image.tmdb.org/t/p/original/' + this.props.poster}
                    alt={"missing"}
                    onLoad={this.setImageLoaded} 
                    />  
                    <div className={classes.Overlay}>
                        <div className={classes.RemoveBtnDiv}> 
                            <button
                            className={classes.Delete}
                            onClick={this.props.removeItem}>
                                <i className="fa fa-times"></i></button>
                        </div>
                    </div>
                </div>
        );
    }

}
export default Item;