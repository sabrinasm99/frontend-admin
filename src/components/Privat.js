import React from 'react'
import {Route, Redirect} from 'react-router-dom';

function Privat(props) {
    const token = localStorage.getItem('token');

    if (token) {

        return (
            <Route path={props.path}>
                {props.component}
            </Route>
            )
    }
    return (
        <Redirect to="/" />
    )
}

export default Privat;
