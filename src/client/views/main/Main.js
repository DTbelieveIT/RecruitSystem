import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRender from 'pure-render-decorator';

@pureRender
class Main extends React.Component {
    static propTypes = {
        children: PropTypes.element,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    render() {
        return (
            <div className="main">
                { this.props.children }
            </div>
        );
    }
}

module.exports = Main
