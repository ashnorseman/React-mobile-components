/**
 * Created by AshZhang on 15/11/9.
 */


import './Message.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';
import DialogMixin from '../../common/utils/dialog-mixin';
import Icon from '../Icon';


const _messageHolder = document.createElement('div');
document.body.appendChild(_messageHolder);


class Message extends Component {

  componentDidMount() {
    this.open();
    this._setAnimation();
  }

  /**
   * Open and close animations
   */
  _setAnimation() {
    setTimeout(() => {
      this.close();

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

          classes = mixClass({
            'message': true,
            'dialog': true,
            '$': className
          });

    return (
      <div className={classes} {...props}>
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

reactMixin(Message.prototype, DialogMixin);


export default function (text, duration) {
  ReactDOM.render(
    <Message duration={duration}>{text}</Message>,
    _messageHolder
  );
}
