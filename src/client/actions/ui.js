import store from '../store/ConfigStore';
import {OPENNOTIFICATION,CLOSENOTIFICATION} from '../constants/Const'

const dispatch = store.dispatch;
let closeNotification = null;

const actions = {
    openNotification: function (content) {
        dispatch({ type: OPENNOTIFICATION, content });
        clearTimeout(closeNotification);
        closeNotification = setTimeout(this.closeNotification, 3000);
    },
    closeNotification: () => dispatch({ type: CLOSENOTIFICATION }),
};

export default actions;
