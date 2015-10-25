/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './Badge.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';


class Badge extends Component {

  render() {
    return (
      <span className='badge'>
        {this.props.children}
      </span>
    );
  }
}

Badge.propTypes = {
  children: PropTypes.node.isRequired
};


export default pureRender(Badge);