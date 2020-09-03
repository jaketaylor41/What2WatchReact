import React, { Component } from 'react';
import classes from './Item.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


class Item extends Component {

    state = {
        imageLoaded: false
    }

    setImageLoaded = () => {
        this.setState({imageLoaded: true});
    }

    


    render () {

        const renderTooltip = (props) => (
            <Tooltip {...props}>
                Remove Item
            </Tooltip>
        );

        const loadImageClasses = [];
        if (!this.state.imageLoaded) {
            loadImageClasses.push(classes.PosterLoading);
        }
        if (this.state.imageLoaded) {
            loadImageClasses.push(classes.PosterContainer);
        }


        return (
            <div className={classes.WatchListWrapper}>
                <div className={loadImageClasses.join(' ')} onClick={this.props.clicked}>
                    <div className={classes.Wrapper}>
                        <img
                        className={classes.Poster}
                        src={'https://image.tmdb.org/t/p/original/' + this.props.poster}
                        alt={"missing"}
                        onLoad={this.setImageLoaded} 
                        />  
                            <div className={classes.Overlay}>
                                <div className={classes.OverlayShadow}>
                                    <div className={classes.ItemInfo}>
                                        <p className={classes.ItemTitle}>{this.props.title}</p>
                                        <p className={classes.ItemMpaa}>{this.props.mpaa}</p>
                                        <p className={classes.ItemDuration}>{this.props.duration}</p>
                                    </div>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={renderTooltip}>
                                        <div className={classes.RemoveBtnDiv}> 
                                            <button
                                            className={classes.Delete}
                                            onClick={this.props.removeItem}>
                                                <i className="fa fa-times"></i></button>
                                        </div>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }

}
export default Item;