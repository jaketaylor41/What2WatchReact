import React, { Component } from 'react';
import axios from 'axios';
import InTheatrePoster from '../../components/InTheatres/InTheatresPoster/InTheatresPoster';
import InTheatresTitle from '../../components/InTheatres/InTheatresTitle/InTheatresTitle';
import UpcomingTitle from '../../components/Upcoming/UpcomingTitle/UpcomingTitle';
import UpcomingPoster from '../../components/Upcoming/UpcomingPoster/UpcomingPoster';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Home.css'

class Home extends Component {

    state = {
       nowShowing: null,
       upcoming: null,
       isMounted: false
    }

    componentDidMount () {
        this.fetchData();
        this.setState({isMounted: true})
    }

    fetchData = () => {
        axios.all([
            axios.get('https://api.themoviedb.org/3/movie/now_playing?region=US&page=1&language=en-US&api_key=b2b33767c6b429003530678acd077911'),
            axios.get('https://api.themoviedb.org/3/movie/upcoming?region=US&page=1&language=en-US&api_key=b2b33767c6b429003530678acd077911')
        ])
            .then(response => {
                const nowPlayingData = response[0].data.results.slice(0, 10);
                this.setState({nowShowing: nowPlayingData});
                console.log(response[0]);
                const upcomingData = response[1].data.results.slice(0, 10);
                this.setState({upcoming: upcomingData});
                console.log(response[1]);
            })
            .catch(error => console.log(error));
    }

        componentDidUpdate () {
            if (!this.state.isMounted) {
                this.fetchData();
            }
        }

        componentWillUnmount () {
            console.log("LEAVING HOME PAGE");
            this.setState({isMounted: false});
        }

    
    
    render () {


        let showing = null;
        let upcoming = null;

        if (this.state.nowShowing) {
            showing = this.state.nowShowing.map((photo) => {
                return (
                        <InTheatrePoster
                        key={photo.id}
                        poster_path={photo.poster_path}
                        original_title={photo.original_title}
                        release_date={photo.release_date}
                        imdbId={photo.id}
                         />
                 );
            })
        }

        if (this.state.upcoming) {
            upcoming = this.state.upcoming.map((photo) => {
                return (
                    <UpcomingPoster
                    key={photo.id}
                    poster_path={photo.poster_path}
                    original_title={photo.original_title}
                    release_date={photo.release_date}
                     />
                 );
            })
        }


        const settings = {
            dots: false,
            fade: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            arrows: true,
            swipeToSlide: true,
            className: "slides",
            autoplay: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        dots: false,
                        fade: false,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 3,
                        arrows: true,
                        swipeToSlide: true,
                        className: "slides",
                        autoplay: false,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        dots: false,
                        fade: false,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 2,
                        arrows: true,
                        swipeToSlide: true,
                        className: "slides",
                        autoplay: false,
                    }
                }
            ]
        };

        let homeDiv = {
            overflow: 'hidden'
        }

        return (
            <div style={homeDiv}>
                <section>
                    <InTheatresTitle />
                    
                    <Slider {...settings}>
                        {showing}
                    </Slider>
                </section>

                <section>
                <UpcomingTitle />
                    <Slider {...settings}>
                        {upcoming}
                    </Slider>
                </section>
            </div>




        );
    }
}

export default Home;