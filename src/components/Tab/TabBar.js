/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

require('./TabBar.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const activeTabMixin = require('./activeTabMixin');


const TabBar = React.createClass({
  mixins: [PureRenderMixin, activeTabMixin],

  componentDidMount() {
    document.body.firstElementChild.classList.add('tab-bar-mounted');
    window.addEventListener('hashchange', this.setActive, false);
  },

  componentWillUnmount() {
    document.body.firstElementChild.classList.remove('tab-bar-mounted');
    window.removeEventListener('hashchange', this.setActive, false);
  },

  render() {
    return this._renderTab('bar');
  }
});


module.exports = TabBar;