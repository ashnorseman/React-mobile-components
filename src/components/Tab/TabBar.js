/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

require('./TabBar.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const TabBase = require('./TabBase.js');


const TabBar = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      active: this._getActiveHash()
    };
  },

  componentDidMount() {
    document.body.firstElementChild.classList.add('tab-bar-mounted');
    window.addEventListener('hashchange', this.setActive, false);
  },

  componentWillUnmount() {
    document.body.firstElementChild.classList.remove('tab-bar-mounted');
    window.removeEventListener('hashchange', this.setActive, false);
  },

  render() {
    const {
            data,
            ...props
            } = this.props,

          { active } = this.state,

          tabData = this._findActiveTab(data, active);

    return (
      <TabBase {...props} data={tabData} type='bar'>
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
});


module.exports = TabBar;