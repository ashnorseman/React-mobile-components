/**
 * Created by AshZhang on 15/11/9.
 */


'use strict';

require('./Message.less');

const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const Icon = require('../Icon/Icon');


const _messageHolder = document.createElement('div');
document.body.appendChild(_messageHolder);


const Message = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    duration: React.PropTypes.number.isRequired
  },

  getDefaultProps() {
    return {
      duration: 1800
    };
  },

  getInitialState() {
    return {
      closed: false,
      opened: false
    };
  },

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    this.setState({
      opened: true,
      left: Math.max((document.documentElement.clientWidth - el.clientWidth) / 2),
      top: Math.max((document.documentElement.clientHeight - el.clientHeight) / 2) + window.scrollY
    });

    this._setAnimation();
  },

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
        <Icon name='exclamation' />
        {children}
      </div>
    );
  },


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
});


module.exports = function (text, duration) {
  ReactDOM.render(
    <Message duration={duration}>{text}</Message>,
    _messageHolder
  );
};