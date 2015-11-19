/**
 * Created by AshZhang on 15/10/25.
 */


import './fonts/iconfont.css';
import './Icon.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';


export default class Icon extends Component {

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
      <i className={classes} />
    );
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  rotate: PropTypes.bool
};

reactMixin(Icon.prototype, PureRenderMixin);
