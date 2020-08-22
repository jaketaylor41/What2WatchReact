import React, { Component } from 'react';
import axios from 'axios';
import Item from '../../components/Watch/Item/Item';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './WatchList.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Auth from '../Auth/Auth';

class WatchList extends Component {

    state = {
        loggedIn: false
    }

    componentDidMount() {
        console.log("Mounted");
        if (this.props.isAuthenticated) {
            this.props.onFetchWatchList(this.props.token, this.props.userId);
        }
    }

    componentDidUpdate (prevState) {
        if (prevState.isAuthenticated !== this.props.isAuthenticated){
            console.log("Updated")
            this.props.onFetchWatchList(this.props.token, this.props.userId);
        }
    }

    // removeFromListHandler = (itemKey) => {

    //     const currentList = this.state.watchList;

    //     axios.delete(`https://what2watch-cf980.firebaseio.com/watch/${itemKey}.json`)
    //         .then(response => {
    //             this.setState({watchList: currentList});
    //             this.fetchWatchList();
    //             console.log(response);
    //         });
            
            
    //         console.log(itemKey)
    // }


    render () {


        let watchItem = null;
        let auth = (

            <div className={classes.AuthDiv}>
                <Auth />
            </div>

        );

        watchItem = this.props.watchList.map((item) => (
            <Col key={item.id}>
                <Item
                    title={item.title}
                    poster={item.poster}
                    removeItem={() => this.removeFromListHandler(item.itemKey)} 
                />
            </Col>

            ));

        return(

            <div className={classes.WatchListDiv}>
                {this.props.isAuthenticated ?
                <Container fluid>
                    <div className={classes.Title}>
                        <h1 className={classes.MyList}>My List</h1>
                        <hr />
                    </div>
                    <Row className={classes.Row}
                    xs={2}
                    md={4}
                    lg={5}
                    xl={7}
                    >
                        {watchItem}
                    </Row>
                </Container> : auth}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        watchList: state.watchList.watchList,
        loading: state.watchList.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        authRedirectPath: state.auth.authRedirectPath,
        isAuthenticated: state.auth.token != null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchWatchList: (token, userId) => dispatch( actions.fetchWatchList(token, userId) )
    };
};


export default connect( mapStateToProps, mapDispatchToProps ) ( withErrorHandler( WatchList, axios));