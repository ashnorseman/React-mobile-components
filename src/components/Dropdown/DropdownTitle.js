/**
 * Created by AshZhang on 15/11/9.
 */


'use strict';

require('./DropdownTitle.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const Icon = require('../Icon/Icon');


const DropdownTitle = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    opened: React.PropTypes.bool
  },

  render() {
    const {
            className,
            name,
            text,
            active,
            opened,
            ...props
          } = this.props,

          classes = mixClass({
            'dropdown-title': true,
            'opened': opened,
            'active': active,
            '$': className
          });

    return (
      <div className={classes} {...props}>
        {text}
        <Icon name={opened ? 'arrow-up' : 'arrow-down'} />
      </div>
    );
  }
});


module.exports = DropdownTitle;