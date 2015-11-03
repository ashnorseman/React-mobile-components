/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

require('./TabItem.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const Badge = require('../Badge/Badge.js');
const Icon = require('../Icon/Icon.js');


const TabItem = React.createClass({
  mixins: [PureRenderMixin],

  propType: {
    active: React.PropTypes.bool.isRequired,
    badge: React.PropTypes.oneOf(['string', 'number']),
    className: React.PropTypes.string,
    icon: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    type: React.PropTypes.number,
    text: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return  {
      active: false,
      type: 0
    };
  },

  render() {
    const {
            active,
            badge,
            className,
            icon,
            link,
            type,
            text
          } = this.props,

          classes = mixClass({
            'tab-item': true,
            'active': active,
            'tab-item-type-$': type,
            '$': className
          }),

          badgeElement = badge
            ? <Badge>{badge}</Badge>
            : null,

          href = /^(https?)|(\/\/)/.test(link) ? link : `#/${link}`;

    return (
      <a className={classes} href={href}>
        {badgeElement}
        <Icon name={icon}></Icon>
        <span className='tab-text'>{text}</span>
      </a>
    );
  }
});


module.exports = TabItem;