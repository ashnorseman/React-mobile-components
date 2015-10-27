/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './TopAction.less';

import React, { Component, PropType } from 'react';

import pureRender from '../../common/utils/pure-render';
import Icon from '../Icon/Icon.jsx';


class TopAction extends Component {

  constructor(props) {
    super(props);
    this._listenToScroll = this._listenToScroll.bind(this);

    this.state = {
      visible: window.pageYOffset > 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this._listenToScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._listenToScroll, false);
  }

  render() {
    const { visible } = this.state,

          visibilityStyle = {
            display: visible ? 'block' : 'none'
          };

    return (
      <span className='top-action'
            style={visibilityStyle}
            onTouchTap={this.scrollTop}>
        <Icon name='top'></Icon>
      </span>
    );
  }


  /**
   * Scroll to the top of window
   */
  scrollTop() {
    window.scroll(0, 0);
  }


  /**
   * Only visible when the viewport has been scrolled down
   * @private
   */
  _listenToScroll() {
    this.setState({
      visible: window.pageYOffset > 0
    });
  }
}


export default pureRender(TopAction);