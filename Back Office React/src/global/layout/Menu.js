import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from '@material-ui/icons/Settings';


import { withRouter } from 'react-router-dom';
import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    Responsive,
} from 'react-admin';






//////////////////////////////////
/////////MENU SELECTION //////////
//////////////////////////////////

const MenuSelection = ({handleToggle, state, ...props}) => {
    return[
            <MenuItemLink
                to={`/categorie`}
                primaryText={"Liste Categories"}
                onClick={onMenuClick}
            />,
            <MenuItemLink
                to={`/hashtags`}
                primaryText={"Liste hashtags"}
                onClick={onMenuClick}
            />,
            <MenuItemLink
                to={`/users`}
                primaryText={"Liste Utilisateurs"}
                onClick={onMenuClick}
            />
    ]

};

///////////////////////////////
/////////CLASS MENU  //////////
///////////////////////////////

class Menu extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        onMenuClick: PropTypes.func,
        logout: PropTypes.object,
    };

    state = {

    };

    handleToggle = menu => {

        this.setState(state => ({ [menu]: !state[menu] }));
    };

    //////////////////////////////////////////////////////////

    render() {

        const { onMenuClick, open, logout, translate } = this.props;
        return (
            <div>
                {' '}

                <MenuSelection handleToggle={this.handleToggle} state={this.state} props={this.props} />

                <Responsive
                    xsmall={
                        <MenuItemLink
                            to="/configuration"
                            primaryText={"configuration"}
                            leftIcon={<SettingsIcon />}
                            onClick={onMenuClick}
                        />
                    }
                    medium={null}
                />
                <Responsive
                    small={logout}
                    medium={null} // Pass null to render nothing on larger devices
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        {}
    ),
    translate
);

export default enhance(Menu);
