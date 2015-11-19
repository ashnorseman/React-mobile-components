/**
 * Created by AshZhang on 15/11/9.
 */


import './Message.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon';


const _messageHolder = document.createElement('div');
document.body.appendChild(_messageHolder);


class Message extends Component {

  constructor(props) {
    super(props);

    this.state = {
      closed: false,
      opened: false
    };
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    /* eslint-disable */
    this.setState({
      opened: true,
      left: Math.max((document.documentElement.clientWidth - el.clientWidth) / 2),
      top: Math.max((document.documentElement.clientHeight - el.clientHeight) / 2) + window.scrollY
    });
    /* eslint-enable */

    this._setAnimation();
  }

  /**
   * Open and close animations
   */
  _setAnimation() {
    setTimeout(() => {
      this.setState({
        opened: false,
        closed: true
      });

      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(_messageHolder);
      }, 200);
    }, this.props.duration);
  }


  render() {
    const {
            children,
            className,
            ...props
          } = this.props,

          {
            closed,
            opened,
            left,
            top
          } = this.state,

          classes = mixClass({
            'message': true,
            'message-opened': opened,
            'message-closed': closed,
            '$': className
          });

    return (
      <div className={classes} {...props} style={{ left, top }}>
        <Icon name="exclamation" />
        {children}
      </div>
    );
  }
}

Message.propTypes = {
  className: PropTypes.string,
  duration : PropTypes.number.isRequired
};

Message.defaultProps = {
  duration: 1800
};

reactMixin(Message.prototype, PureRenderMixin);


export default function (text, duration) {
  ReactDOM.render(
    <Message duration={duration}>{text}</Message>,
    _messageHolder
  );
}
