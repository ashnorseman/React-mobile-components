/**
 * Created by AshZhang on 15/11/9.
 */


import './DropdownTitle.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon';


export default function DropdownTitle({
  active,
  className,
  name,
  opened,
  text,
  ...props
}) {
  const classes = mixClass({
      'dropdown-title': true,
      active,
      opened,
      '$': className
    });

  return (
    <div className={classes} {...props}>
      {text}
      <Icon name="arrow-down" />
    </div>
  );
}

DropdownTitle.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  opened: PropTypes.bool,
  text: PropTypes.string.isRequired
};
