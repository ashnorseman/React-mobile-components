/**
 * Created by AshZhang on 15/11/2.
 */


'use strict';

import './TableHeader.less';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const Icon = require('../Icon/Icon.js');


const TableHeader = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    expanded: React.PropTypes.bool
  },

  render() {
    const {
            children,
            className,
            expanded,
            ...props
          } = this.props,

          classes = mixClass({
            'table-header': true,
            '$': className
          }),

          toggle = (expanded !== undefined)
                      ? <Icon name='arrow-down' className={expanded ? 'expanded' : ''}></Icon>
                      : null;

    return (
      <header className={classes} {...props}>
        {children}
        {toggle}
      </header>
    );
  }
});


module.exports = TableHeader;