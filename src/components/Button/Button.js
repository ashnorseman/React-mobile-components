/**
 * Created by AshZhang on 15/10/27.
 */


'use strict';

require('./Button.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const Icon = require('../Icon/Icon.js');


const Button = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
    type: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      type: 'button'
    };
  },

  render() {
    const {
            children,
            className,
            icon,
            link,
            ...props
          } = this.props,

          classes = mixClass({
            'btn': true,
            'btn-link': link,
            '$': className
          }),

          iconNode = icon
            ? <Icon name={icon}></Icon>
            : null;

    return (
      <button className={classes} {...props}>
        {iconNode}
        {children}
      </button>
    );
  }
});


module.exports = Button;