import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

import './App.css';

import authProvider from './authProvider';
import themeReducer from './themeReducer';
import { Login, Layout } from './global/layout';
import customRoutes from './routes';


//BACKOFFICE
import categorie from './BackOffice/categories';
import hashtags from './BackOffice/hashtags';
import users from './BackOffice/users';



//A VOIR POUR LE DASHBOARD
import { Dashboard } from './global/dashboard';

//dataprovider : permet de faire la transition React => API node
import dataProvider from './dataProvider.js';


class App extends Component {
    render() {


        return (

            <Admin
                title=""
                dataProvider={dataProvider}
                customReducers={{ theme: themeReducer }}
                customRoutes={customRoutes}
                authProvider={authProvider}
                dashboard={Dashboard}
                loginPage={Login}
                appLayout={Layout}
            >

                <Resource name="categorie" {...categorie} />
                <Resource name="hashtags" {...hashtags} />
                <Resource name="users" {...users} />
            </Admin>
        );
    }
}

export default App;