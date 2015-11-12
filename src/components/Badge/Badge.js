/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

require('./Badge.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');


const Badge = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string
  },

  render() {
    const {
            children,
            className
          } = this.props,

          classes = mixClass({
            'badge': true,
            '$': className
          });

    return (
      <span className={classes}>
        {+children > 99 ? '99+' : children}
      </span>
    );
  }
});


module.exports = Badge;
