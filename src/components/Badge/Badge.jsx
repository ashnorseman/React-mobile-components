/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './Badge.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';


class Badge extends Component {

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
        {children}
      </span>
    );
  }
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};


export default pureRender(Badge);