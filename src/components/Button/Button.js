/**
 * Created by AshZhang on 15/10/27.
 */


import './Button.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon';


export default function Button({
  children,
  className,
  icon,
  link,
  ...props
}) {
  const classes = mixClass({
          'btn': true,
          'btn-link': link,
          '$': className
        }),

        iconNode = icon
          ? <Icon name={icon} />
          : null;

  return (
    <button className={classes} {...props}>
      {iconNode}
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.bool,
  type: PropTypes.string.isRequired
};

Button.defaultProps = {
  type: 'button'
};
