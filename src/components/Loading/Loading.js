/**
 * Created by AshZhang on 15/11/9.
 */


import './Loading.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';


export default class Loading extends Component {

  render() {
    const {
            className,
            ...props
          } = this.props,

          classes = mixClass({
            'loading': true,
            '$': className
          });

    return (
      <div className={classes} {...props}>
        <div className="loading-dot" />
        <div className="loading-dot" />
        <div className="loading-dot" />
        <div className="loading-dot" />
        <div className="loading-dot" />
        <div className="loading-dot" />
        <div className="loading-dot" />
        <div className="loading-dot" />
      </div>
    );
  }
}

Loading.propTypes = {
  className: PropTypes.string
};

reactMixin(Loading.prototype, PureRenderMixin);
