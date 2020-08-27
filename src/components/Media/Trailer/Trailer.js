import React from 'react';
import Youtube from 'react-youtube';
import classes from './Trailer.css';


const trailer = (props) => {

        const opts = {
            width: '100%',
            height: '100%',
            playerVars: {
                autoplay: 1,
            },
        };

        return (

            <div style={{position: 'relative', paddingBottom: '56.25%', height: '0'}}>
                <Youtube className={classes.IFrame} videoId={props.videoKey} opts={opts} />
            </div>


        );
}

export default trailer;