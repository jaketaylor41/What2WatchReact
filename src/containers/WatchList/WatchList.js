import React, { Component } from 'react';
import axios from 'axios';
import Item from '../../components/Watch/Item/Item';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './WatchList.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Aux/Aux';

class WatchList extends Component {


    componentDidMount() {
        this.props.onFetchWatchList(this.props.token, this.props.userId);
    }

    removeFromListHandler = (itemKey) => {

        this.props.onRemoveWatchItem(this.props.token, this.props.userId, itemKey);

    }


    render () {


        let watchItem = null;

        watchItem = this.props.watchList.map((item, idx) => (
                <Col className={classes.ItemCol} key={item.poster} xs="auto" sm="auto" md="auto" lg="auto">
                    <Item
                        poster={item.poster}
                        title={item.title}
                        mpaa={item.mpaa}
                        duration={item.duration}
                        removeItem={() => this.removeFromListHandler(item.itemId)}
                    />
                </Col>
            ));




        return(
            <Aux>
                {this.props.isAuthenticated &&
                <div className={classes.WatchListDiv} key={this.props.isAuthenticated}>
                    <Container fluid>
                        <div className={classes.Title}>
                            <h1 className={classes.MyList}>My List</h1>
                            <hr />
                        </div>
                        <Row className={classes.Row} xs={1}>
                            {watchItem}
                        </Row>
                    </Container>
                </div>}
            </Aux>

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
        onFetchWatchList: (token, userId) => dispatch( actions.fetchWatchList(token, userId) ),
        onRemoveWatchItem: (token, userId, itemKey) => dispatch( actions.removeWatchItem(token, userId, itemKey))
    };
};


export default connect( mapStateToProps, mapDispatchToProps ) ( withErrorHandler( WatchList, axios));