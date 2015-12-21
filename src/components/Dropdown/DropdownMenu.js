/**
 * Created by AshZhang on 15/11/9.
 */


import './DropdownMenu.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';


export default function DropDownMenu({
  active,
  className,
  name,
  text,
  ...props
}) {
  const classes = mixClass({
      'dropdown-menu': true,
      '$': className,
      active
    });

  return (
    <li className={classes} {...props}>
      {text}
    </li>
  );
}

DropDownMenu.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
