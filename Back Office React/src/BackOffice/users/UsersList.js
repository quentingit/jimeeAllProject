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
import dataProvider from "../../dataProvider";





const styles = {
    nb_commands: { color: 'purple' },
};




//function formatage date
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month].join('-');
}


const UsersList = ({ classes, ...props }) => (



    <List
        {...props}
        title={"Utilisateurs "}
        filter={{ id_projet: (localStorage.getItem("id_projet")) }}
    >
        <Responsive

            medium={
                <Datagrid>
                    <TextField source="nom"/>
                    <TextField source="mail"/>
                    <EditButton label="editer" />
                </Datagrid>
            }
        />
    </List>
);

export default withStyles(styles)(usersList);