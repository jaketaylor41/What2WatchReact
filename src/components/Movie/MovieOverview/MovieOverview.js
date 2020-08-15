import React from 'react';
import Aux from '../../../hoc/Aux/Aux';



const movieOverview = (props) => {

    return (
        <Aux>
            <h3>{props.title}</h3>
            <h6>Released: {props.date}</h6>
            <p>{props.overview}</p>
        </Aux>

    );
    
};

export default movieOverview;