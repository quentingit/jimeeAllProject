import { CHANGE_THEME } from './global/configuration/actions';

export default (previousState = 'light', { type, payload }) => {
    if (type === CHANGE_THEME) {
        return payload;
    }
    return previousState;
};
