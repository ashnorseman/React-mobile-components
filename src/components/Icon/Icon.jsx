/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './Icon.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';


class Icon extends Component {

  render() {
    const {
            className,
            name,
            rotate
          } = this.props,

          classes = mixClass({
            'iconfont': true,
            'icon-$': name,
            'icon-rotate': rotate,
            '$': className
          });

    return (
      <i className={classes}></i>
    );
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  rotate: PropTypes.bool
};


export default pureRender(Icon);