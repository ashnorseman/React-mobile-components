/**
 * Created by AshZhang on 15/10/25.
 */


import './TabNav.less';

import React, { Component, PropTypes } from 'react';

import TabBase from './TabBase';


export default class TabNav extends Component {

  render() {
    return (
      <TabBase type="nav"
               {...this.props}
               {...this.state}>
        {this.props.children}
      </TabBase>
    );
  }
}
