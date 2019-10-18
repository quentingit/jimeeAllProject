import React from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { translate, changeLocale, Title } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import { changeTheme } from './actions';

const styles = {
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
};

const Configuration = ({
    classes,
    theme,
    locale,
    changeTheme,
    changeLocale,
    translate,
}) => (
    <Card>
        <Title title="configuration" />
        <CardContent>
            <div className={classes.label}>{"Theme"}</div>
            <Button
                variant="raised"
                className={classes.button}
                color={theme === 'light' ? 'primary' : 'default'}
                onClick={() => changeTheme('light')}
            >
                {"Blanc"}
            </Button>
            <Button
                variant="raised"
                className={classes.button}
                color={theme === 'dark' ? 'primary' : 'default'}
                onClick={() => changeTheme('dark')}
            >
                {"Noir"}
            </Button>
        </CardContent>
    </Card>
);

const mapStateToProps = state => ({
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    connect(
        mapStateToProps,
        {
            changeLocale,
            changeTheme,
        }
    ),
    translate,
    withStyles(styles)
);

export default enhance(Configuration);
