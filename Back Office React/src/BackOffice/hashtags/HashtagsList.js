import React, { Component, View } from 'react';
import {
    BooleanField,
    Datagrid,
    DateField,
    DateInput,
    EditButton,
    Filter,
    List,
    NullableBooleanInput,
    NumberField,
    Responsive,
    SearchInput,
    TextField,
    GET_ONE,
    ReferenceField, GET_MANY, DELETE, CREATE
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';



const styles = {
    nb_commands: { color: 'purple' },
};




const HashtagsList = ({ classes, ...props }) => (



    <List
        {...props}
        title={"Utilisateurs "}
        filter={{ id_projet: (localStorage.getItem("id_projet")) }}
    >
        <Responsive
            //xsmall={<MobileGrid />}
            medium={
                <Datagrid>
                    <TextField source="tags"/>
                    <TextField source="categorie"/>
                    <TextField source="sous-categorie"/>
                    <EditButton label="editer" />
                </Datagrid>
            }
        />
    </List>
);

export default withStyles(styles)(HashtagsList);