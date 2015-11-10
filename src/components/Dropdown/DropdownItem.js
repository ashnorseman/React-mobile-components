/**
 * Created by AshZhang on 15/11/9.
 */


'use strict';

require('./DropdownItem.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const Icon = require('../Icon/Icon');


const DropdownItem = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool
  },

  render() {
    const {
            className,
            name,
            text,
            active,
            ...props
          } = this.props,

          classes = mixClass({
            'dropdown-item': true,
            'active': active,
            '$': className
          });

    return (
      <li className={classes} {...props}>
        <div className='dropdown-item-text'>
          {text}
          {active ? <Icon name='checked' /> : null}
        </div>
      </li>
    );
  }
});


module.exports = DropdownItem;