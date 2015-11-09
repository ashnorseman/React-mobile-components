/**
 * Created by AshZhang on 15/11/9.
 */


'use strict';

require('./TabScope.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const activeTabMixin = require('./activeTabMixin');


const TabScope = React.createClass({
  mixins: [PureRenderMixin, activeTabMixin],

  componentDidMount() {
    document.body.firstElementChild.classList.add('tab-scope-mounted');
    window.addEventListener('hashchange', this.setActive, false);
  },

  componentWillUnmount() {
    document.body.firstElementChild.classList.remove('tab-scope-mounted');
    window.removeEventListener('hashchange', this.setActive, false);
  },

  render() {
    return this._renderTab('scope');
  }
});


module.exports = TabScope;