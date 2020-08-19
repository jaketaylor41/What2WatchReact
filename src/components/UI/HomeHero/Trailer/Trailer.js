import React, { Component } from 'react';
import Youtube from 'react-youtube';
import axios from 'axios';
import classes from './Trailer.css';


class Trailer extends Component {

    state = {
        videoKey: []
    }

    componentDidMount () {
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.id}?api_key=b2b33767c6b429003530678acd077911&language=en-US&append_to_response=videos`)
            .then(response => {
                const youtubeKey = response.data.videos.results[0];
                this.setState({videoKey: youtubeKey});
                console.log(youtubeKey);
            })
            .catch(error => console.log(error));
    }

    render () {
        const opts = {
            width: '100%',
            height: '100%',
            playerVars: {
                autoplay: 1,
            },
        };
        let video = null;

        if(this.state.videoKey) {
            video = <Youtube className={classes.IFrame} videoId={this.state.videoKey.key} opts={opts} />
        }

        return (

            <div style={{position: 'relative', paddingBottom: '56.25%', height: '0'}}>
                {video}
            </div>


        );
    }

}

export default Trailer;