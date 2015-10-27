/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './TabNav.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import TabBase from './TabBase.jsx';


class TabNav extends Component {

  render() {
    return (
      <TabBase {...this.props} {...this.state} type='nav'>
        {this.props.children}
      </TabBase>
    );
  }
}


export default pureRender(TabNav);