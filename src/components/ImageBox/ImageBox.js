/**
 * Created by AshZhang on 15/10/27.
 */


import './ImageBox.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';


export default function ImageBox({
  alt,
  className,
  src,
  ...props
}) {
  const classes = mixClass({
      'image-box': true,
      '$': className
    });

  return (
    <div className={classes} {...props}>
      <img className="image-box-pic"
           src={src}
           alt={alt} />
    </div>
  );
}

ImageBox.propTypes = {
  alt      : PropTypes.string,
  className: PropTypes.string,
  src      : PropTypes.string.isRequired
};

ImageBox.defaultProps = {
  alt: '',
  src: ''
};
