/**
 * Created by AshZhang on 15/10/25.
 */


import './TabItem.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import Badge from '../Badge';
import Icon from '../Icon';


export default function TabItem({
  active,
  badge,
  className,
  icon,
  link,
  type,
  text,
  ...props
}) {
  const classes = mixClass({
      'tab-item': true,
      'tab-item-type-$': type,
      '$': className,
      active
    }),

    badgeElement = badge
      ? <Badge>{badge}</Badge>
      : null,

    iconElement = icon ? <Icon name={icon} /> : null,

    href = /^(https?)|(\/\/)/.test(link) ? link : `#/${link}`;

  return (
    <a className={classes}
       href={href}
       {...props}>
      {badgeElement}
      {iconElement}
      <span className="tab-text">{text}</span>
    </a>
  );
}

TabItem.propTypes = {
  active: PropTypes.bool,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.number
};

TabItem.defaultProps = {
  type  : 0
};
