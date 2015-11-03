/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

require('./Icon.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');


const Icon = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    rotate: React.PropTypes.bool
  },

  render() {
    const {
            className,
            name,
            rotate
          } = this.props,

          classes = mixClass({
            'iconfont': true,
            'icon-$': name,
            'icon-rotate': rotate,
            '$': className
          });

    return (
      <i className={classes}></i>
    );
  }
});


module.exports = Icon;