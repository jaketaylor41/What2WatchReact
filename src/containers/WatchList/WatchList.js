import React, { Component } from 'react';
import axios from 'axios';
import Item from '../../components/Watch/Item/Item';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './WatchList.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class WatchList extends Component {

    // state = {
    //     watchList: null
    // }

    componentDidMount () {
        this.props.onFetchWatchList(this.props.token, this.props.userId);
    }
    
    // fetchWatchList = () => {
    //     axios.get('https://what2watch-cf980.firebaseio.com/watch.json')
    //         .then(response => {
    
    //             const items = Object.values(response.data);
    //             const key = Object.keys(response.data);
    
    //             const data = items.map((itemKeys, index) => {
    //                 return {
    //                     ...itemKeys,
    //                     itemKey: key[index]
    //                 }
    //             });
    //             this.setState({watchList: data});
    //             console.log(this.state.watchList);
    //         })
    //         .catch(error => console.log(error));

    // }


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

        let watchItem = (
            <div className={classes.SpinnerDiv}>
                <Spinner />
            </div>
        );

        if (!this.props.loading) {

            watchItem = this.props.watchList.map((item) => (
                <Col key={item.id}>
                    <Item
                        id={item.id}
                        title={item.title}
                        poster={item.poster}
                        removeItem={() => this.removeFromListHandler(item.itemKey)} 
                    />
                </Col>

            ));
        }

        return(

            <div>
                <h1>My List</h1>
                <Container fluid> 
                    <Row
                    xs={3}
                    md={4}
                    lg={6}
                    xl={7}
                    >
                        {watchItem}
                    </Row>
                </Container>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        watchList: state.watchList.watchList,
        loading: state.watchList.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchWatchList: (token, userId) => dispatch( actions.fetchWatchList(token, userId) )
    };
};


export default connect( mapStateToProps, mapDispatchToProps ) ( withErrorHandler( WatchList, axios));