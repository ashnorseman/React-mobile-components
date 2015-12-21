/**
 * Created by AshZhang on 15/11/9.
 */


import './Loading.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';


export default function Loading({
  className,
  ...props
}) {
  const classes = mixClass({
      'loading': true,
      '$': className
    });

  return (
    <div className={classes} {...props}>
      <div className="loading-dot" />
      <div className="loading-dot" />
      <div className="loading-dot" />
      <div className="loading-dot" />
      <div className="loading-dot" />
      <div className="loading-dot" />
      <div className="loading-dot" />
      <div className="loading-dot" />
    </div>
  );
}

Loading.propTypes = {
  className: PropTypes.string
};
