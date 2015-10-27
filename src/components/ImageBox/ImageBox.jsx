/**
 * Created by AshZhang on 15/10/27.
 */


'use strict';

import './ImageBox.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';


class ImageBox extends Component {

  render() {
    const {
            alt,
            className,
            src
          } = this.props,

          classes = mixClass({
            'image-box': true,
            '$': className
          });

    return (
      <div className={classes}>
        <img className='image-box-pic' src={src} alt={alt} />
      </div>
    );
  }
}


ImageBox.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.string.isRequired
};

ImageBox.defaultProps = {
  alt: '',
  src: ''
};


export default pureRender(ImageBox);