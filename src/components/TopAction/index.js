/**
 * Created by AshZhang on 15/10/25.
 */


import './TopAction.less';

import React, { Component, PropTypes } from 'react';

import Icon from '../Icon';


export default class TopAction extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: window.pageYOffset > 0
    };

    this._listenToScroll = this._listenToScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this._listenToScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._listenToScroll, false);
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


  render() {
    const {
        visible
      } = this.state,

      visibilityStyle = {
        display: visible ? 'block' : 'none'
      };

    return (
      <span className="top-action"
            style={visibilityStyle}
            onTouchTap={this.scrollTop}>
        <Icon name="top" />
      </span>
    );
  }
}
