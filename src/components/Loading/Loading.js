/**
 * Created by AshZhang on 15/11/9.
 */


'use strict';

require('./Loading.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');


const Loading = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string
  },

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
        <div className='loading-dot'></div>
        <div className='loading-dot'></div>
        <div className='loading-dot'></div>
        <div className='loading-dot'></div>
        <div className='loading-dot'></div>
        <div className='loading-dot'></div>
        <div className='loading-dot'></div>
        <div className='loading-dot'></div>
      </div>
    );
  }
});


module.exports = Loading;