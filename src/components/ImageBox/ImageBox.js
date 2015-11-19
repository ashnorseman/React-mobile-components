/**
 * Created by AshZhang on 15/10/27.
 */


import './ImageBox.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';


export default class ImageBox extends Component {

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
        <img className="image-box-pic" src={src} alt={alt} />
      </div>
    );
  }
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

reactMixin(ImageBox.prototype, PureRenderMixin);
