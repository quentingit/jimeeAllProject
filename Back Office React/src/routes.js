import React from 'react';
import { Route } from 'react-router-dom';
import Configuration from './global/configuration/Configuration';


export default [
    <Route exact path="/configuration" component={Configuration} />,
];
