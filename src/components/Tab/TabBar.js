/**
 * Created by AshZhang on 15/10/25.
 */


import './TabBar.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import activeTabMixin from './activeTabMixin';


export default class TabBar extends Component {

  constructor(props) {
    super(props);

    this.setActive = this.setActive.bind(this);

    this.state = {
      active: this._getActiveHash()
    };
  }

  componentDidMount() {
    document.body.firstElementChild.classList.add('tab-bar-mounted');
    window.addEventListener('hashchange', this.setActive, false);
  }

  componentWillUnmount() {
    document.body.firstElementChild.classList.remove('tab-bar-mounted');
    window.removeEventListener('hashchange', this.setActive, false);
  }

  render() {
    return this._renderTab('bar');
  }
}

reactMixin(TabBar.prototype, PureRenderMixin);
reactMixin(TabBar.prototype, activeTabMixin);
