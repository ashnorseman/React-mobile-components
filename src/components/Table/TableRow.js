/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

require('./TableRow.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const Icon = require('../Icon/Icon.js');


const TableRow = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    disclosure: React.PropTypes.bool,
    href: React.PropTypes.string,
    note: React.PropTypes.string,
    text: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      disclosure: false
    };
  },

  render() {
    const {
            children,
            className,
            disclosure,
            href,
            note,
            text,
            ...props
          } = this.props,

          classes = mixClass({
            'table-row': true,
            '$': className
          }),

          noteNode = note
            ? <div className='table-row-note'>{note}</div>
            : null,

          arrowIcon = disclosure
            ? <Icon name='arrow-right'></Icon>
            : null;

    return (
      <li className={classes} {...props}>
        <a href={href ? `#/${href}` : null} className='table-row-link clearfix'>
          <div className='table-row-left'>
            <div className='table-row-text'>{text}</div>
            {noteNode}
          </div>
          <span className='table-row-content'>{children}</span>
          {arrowIcon}
        </a>
      </li>
    );
  }
});


module.exports = TableRow;