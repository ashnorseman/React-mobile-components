/**
 * Created by AshZhang on 15/11/9.
 */


import './TabScope.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import activeTabMixin from './activeTabMixin';


export default class TabScope extends Component {

  constructor(props) {
    super(props);

    this.setActive = this.setActive.bind(this);

    this.state = {
      active: this._getActiveHash()
    };
  }

  componentDidMount() {
    document.body.firstElementChild.classList.add('tab-scope-mounted');
    window.addEventListener('hashchange', this.setActive, false);
  }

  componentWillUnmount() {
    document.body.firstElementChild.classList.remove('tab-scope-mounted');
    window.removeEventListener('hashchange', this.setActive, false);
  }

  render() {
    return this._renderTab('scope');
  }
}

reactMixin(TabScope.prototype, PureRenderMixin);
reactMixin(TabScope.prototype, activeTabMixin);
