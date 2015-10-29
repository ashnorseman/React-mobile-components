/**
 * Created by AshZhang on 15/10/29.
 */


'use strict';

import './PullLoader.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';


class PullLoader extends Component {

  constructor(props) {
    super(props);
    this._watchScroll = this._watchScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this._watchScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._watchScroll, false);
  }

  render() {

    return (
      <div {...this.props}>{this.props.children}</div>
    );
  }


  /**
   * When page is scrolled to the bottom
   * @private
   */
  _watchScroll() {
    if ((window.scrollY + window.innerHeight >= document.body.clientHeight)
          && (typeof this.props.onPull === 'function')) {
      this.props.onPull.call(this);
    }
  }
}

PullLoader.propTypes = {
  onPull: PropTypes.func.isRequired
};


export default pureRender(PullLoader);