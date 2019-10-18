import React from 'react';
import { AppBar, UserMenu, MenuItemLink, translate } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from '@material-ui/core/styles';

import Logo from './Logo';

const styles = {
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
};

const CustomUserMenu = translate(({ translate, ...props }) => (
    <UserMenu {...props}>
        <MenuItemLink
            to="/configuration"
            primaryText="configuration"
            leftIcon={<SettingsIcon />}
        />
    </UserMenu>
));

const CustomAppBar = ({ classes, ...props }) => {


        return (
            <AppBar {...props} userMenu={<CustomUserMenu />}>
                <Typography
                    variant="title"
                    color="inherit"
                    className={classes.title}
                    id="react-admin-title"
                />




                <span className={classes.spacer} />
            </AppBar>
            )

};

export default withStyles(styles)(CustomAppBar);
