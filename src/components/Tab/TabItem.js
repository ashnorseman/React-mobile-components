/**
 * Created by AshZhang on 15/10/25.
 */


import './TabItem.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';
import Badge from '../Badge/Badge';
import Icon from '../Icon/Icon';


export default class TabItem extends Component {

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
            'tab-item'       : true,
            'tab-item-type-$': type,
            '$'              : className,
            active
          }),

          badgeElement = badge
            ? <Badge>{badge}</Badge>
            : null,

          iconElement = icon ? <Icon name={icon}/> : null,

          href = /^(https?)|(\/\/)/.test(link) ? link : `#/${link}`;

    return (
      <a className={classes} href={href}>
        {badgeElement}
        {iconElement}
        <span className="tab-text">{text}</span>
      </a>
    );
  }
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

reactMixin(TabItem.prototype, PureRenderMixin);
