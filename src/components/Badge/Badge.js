/**
 * Created by AshZhang on 15/10/25.
 */


import './Badge.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';


export default class Badge extends Component {

  render() {
    const {
            children,
            className
          } = this.props,

          classes = mixClass({
            'badge': true,
            '$': className
          });

    return (
      <span className={classes}>
        {+children > 99 ? '99+' : children}
      </span>
    );
  }
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

reactMixin(Badge.prototype, PureRenderMixin);
