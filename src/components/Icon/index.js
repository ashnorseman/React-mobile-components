/**
 * Created by AshZhang on 15/10/25.
 */


import './fonts/iconfont.css';
import './Icon.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';


export default function Icon({
  className,
  name,
  rotate,
  ...props
}) {
  const classes = mixClass({
          'iconfont': true,
          'icon-$': name,
          'icon-rotate': rotate,
          '$': className
        });

  return (
    <i className={classes}
       {...props} />
  );
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  rotate: PropTypes.bool
};
