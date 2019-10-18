import React, { Component, View } from 'react';
import {
    Datagrid,
    DateField,
    DateInput,
    Edit,
    EditButton,
    FormTab, GET_MANY,
    LongTextInput,
    NullableBooleanInput,
    NumberField,
    ReferenceManyField,
    TabbedForm,
    TextField,
    TextInput,
    SelectInput
} from 'react-admin';
import { TimeInput, DateTimeInput } from 'react-admin-date-inputs';

import withStyles from '@material-ui/core/styles/withStyles';
import dataProvider from "../../dataProvider";






const UsersEdit = ({ classes, ...props }) => (
    <Edit  {...props}>
        <TabbedForm>
            <FormTab label="">



                <TextInput
                    source="nom"
                />
                <TextInput
                    source="mail"
                />

            </FormTab>

        </TabbedForm>
    </Edit>
);

export default withStyles(styles)(UsersEdit);
