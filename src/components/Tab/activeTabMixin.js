/**
 * Created by AshZhang on 15/11/9.
 */


import React from 'react';
import TabBase from './TabBase';


export default {


  /**
   * Render a Tab by type
   * @param {string} type
   */
  _renderTab(type) {
    const {
        data,
        ...props
      } = this.props,

      {
        active
      } = this.state,

      tabData = this._findActiveTab(data, active);

    return (
      <TabBase data={tabData}
               type={type}
               {...props}>
        {this.props.children}
      </TabBase>
    );
  },


  /**
   * Set active tab when `location.hash` changes
   */
  setActive() {
    this.setState({
      active: this._getActiveHash()
    });
  },


  /**
   * Get active hash from url
   * @private
   */
  _getActiveHash() {
    return location.hash.replace(/^\/?#\//, '').replace(/\?.+$/, '');
  },


  /**
   * Find the active tab by `location.hash`
   * @param {Array} tabs
   * @param {string} hash
   * @returns {Array}
   * @private
   */
  _findActiveTab(tabs, hash) {
    return tabs.map((tab) => {
      tab.active = (tab.link === hash);
      return tab;
    });
  }
};
