/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './TabBar.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import TabBase from './TabBase.jsx';


class TabBar extends Component {

  constructor(props) {
    super(props);
    this.setActive = this.setActive.bind(this);

    this.state = {
      tabData: this._findActiveTab(this.props.data)
    };
  }

  componentDidMount() {
    document.body.classList.add('tab-bar-mounted');
    window.addEventListener('hashchange', this.setActive, false);
  }

  componentWillUnmount() {
    document.body.classList.remove('tab-bar-mounted');
    window.removeEventListener('hashchange', this.setActive, false);
  }

  render() {
    const { data, ...props } = this.props,
          { tabData } = this.state;

    return (
      <TabBase {...props} data={tabData} tabBar>
        {this.props.children}
      </TabBase>
    );
  }


  /**
   * Set active tab when `location.hash` changes
   */
  setActive() {
    this.setState({
      tabData: this._findActiveTab(this.state.tabData)
    });
  }


  /**
   * Find the active tab by `location.hash`
   * @param {Array} tabs
   * @returns {Array}
   * @private
   */
  _findActiveTab(tabs) {
    const hash = location.hash.replace(/^\/?#\//, '');

    return tabs.map((tab) => {
      tab.active = (tab.link === hash);
      return tab;
    });
  }
}


export default pureRender(TabBar);