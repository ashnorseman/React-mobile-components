/**
 * Created by AshZhang on 15/10/29.
 */


import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import Loading from '../Loading/Loading';


export default class PullLoader extends Component {

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


  render() {
    const {
        loading,
        ...props
      } = this.props;

    return (
      <div {...props}>
        {this.props.children}
        {loading ? <Loading /> : null}
      </div>
    );
  }
}

PullLoader.propTypes = {
  loading: PropTypes.bool,
  onPull : PropTypes.func.isRequired
};
