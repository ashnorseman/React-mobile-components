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
      tabData: this._findActiveTab(this.props.data)
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

          { tabData } = this.state;

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
      tabData: this._findActiveTab(this.state.tabData)
    });
  },


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
});


module.exports = TabBar;