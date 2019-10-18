import React, { Component, View } from 'react';
import {
    Create,
    DateInput,
    FormTab,
    LongTextInput,
    SimpleForm,
    TabbedForm,
    TextInput,
    SelectInput,
    Toolbar,
    SaveButton,
    TextField, GET_ONE, GET_MANY
} from 'react-admin';
import { TimeInput, DateTimeInput } from 'react-admin-date-inputs';


import withStyles from '@material-ui/core/styles/withStyles';
import dataProvider from "../../dataProvider";

export const styles = {
    first_name: { display: 'inline-block' },
    last_name: { display: 'inline-block', marginLeft: 32 },
    email: { width: 544 },
    address: { maxWidth: 544 },
    zipcode: { display: 'inline-block' },
    city: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};


const hidden = { zIndex:'-2' };






const PostCreateToolbar = props => (
    <Toolbar {...props} >
        <SaveButton
            label="Enregistrer"
            redirect="list"
            submitOnEnter={true}
        />
        <SaveButton
            label="Enregistrer et Ajouter"
            redirect={false}
            submitOnEnter={false}
            variant="flat"
        />
    </Toolbar>
);


const HashtagsCreate = ({ classes, ...props }) => (
    <Create

        title={"Ajouter heure supp/retard"}
        {...props}
        redirect="list"
    >


        <SimpleForm label="Créer un Utilisateur"  toolbar={<PostCreateToolbar />} redirect="show" >

            <TextInput
                source="nom"
            />
            <TextInput
                source="mail"
            />

        </SimpleForm>
    </Create>
);

export default withStyles(styles)(HashtagsCreate);
