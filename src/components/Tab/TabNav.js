/**
 * Created by AshZhang on 15/10/25.
 */


import './TabNav.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import TabBase from './TabBase';


export default class TabNav extends Component {

  render() {
    return (
      <TabBase {...this.props} {...this.state} type="nav">
        {this.props.children}
      </TabBase>
    );
  }
}

reactMixin(TabNav.prototype, PureRenderMixin);
