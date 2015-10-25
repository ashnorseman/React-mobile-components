/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './Icon.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';


class Icon extends Component {

  render() {
    const { name } = this.props;

    return (
      <i className={`iconfont icon-${name}`}
         data-name={name.substring(0, 1).toLocaleUpperCase()}></i>
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
};


export default pureRender(Icon);