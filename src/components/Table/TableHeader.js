/**
 * Created by AshZhang on 15/11/2.
 */


import './TableHeader.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon';


export default function TableHeader({
  children,
  className,
  expanded,
  ...props
}) {
  const classes = mixClass({
      'table-header': true,
      '$': className
    }),

    toggle = (expanded !== undefined)
      ? <Icon name="arrow-down"
              className={expanded ? 'expanded' : ''} />
      : null;

  return (
    <header className={classes} {...props}>
      {children}
      {toggle}
    </header>
  );
}

TableHeader.propTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool
};
