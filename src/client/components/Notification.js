import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRender from 'pure-render-decorator';

import './Notification.less'

@pureRender
class Notification extends React.Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        show: PropTypes.bool.isRequired,
    };

    renderNotification() {
        const { content } = this.props;

        return (
            <div className="notification">
                <div>
                    { content }
                </div>
            </div>
        );
    }

    render() {
        const { show } = this.props;
        return show ? this.renderNotification.call(this) : null;
    }
}

export default connect(
    state => ({
        show: state.ui.showNotification,
        content: state.ui.notificationContent,
    })
)(Notification);