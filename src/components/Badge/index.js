/**
 * Created by AshZhang on 15/10/25.
 */


import './Badge.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';


const BADGE_MAX = 99;

export default function Badge({
  children,
  className,
  ...props
}) {
  const classes = mixClass({
          'badge': true,
          '$': className
        });

  return (
    <span className={classes} {...props}>
      {+children > BADGE_MAX ? BADGE_MAX + '+' : children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
