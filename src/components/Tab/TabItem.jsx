/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './TabItem.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';
import Badge from '../Badge/Badge.jsx';
import Icon from '../Icon/Icon.jsx';


class Tab extends Component {

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
            : null;

    return (
      <a className={classes} href={`#/${link}`}>
        {badgeElement}
        <Icon name={icon}></Icon>
        <span className='tab-text'>{text}</span>
      </a>
    );
  }
}

Tab.propType = {
  active: PropTypes.bool.isRequired,
  badge: PropTypes.oneOf(['string', 'number']),
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  type: PropTypes.number,
  text: PropTypes.string.isRequired
};

Tab.defaultProps = {
  active: false,
  type: 0
};


export default pureRender(Tab);