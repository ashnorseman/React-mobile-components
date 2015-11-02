/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './Table.less';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const TableHeader = require('./TableHeader.js');
const TableRow = require('./TableRow.js');


const Table = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    expanded: React.PropTypes.bool,
    onToggle: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      data: []
    };
  },

  getInitialState() {
    return {
      expanded: this.props.expanded
    };
  },

  render() {
    const {
            children,
            className,
            data
          } = this.props,

          { expanded } = this.state,

          classes = mixClass({
            'table': true,
            '$': className
          }),

          touchTap = (expanded !== undefined) ? this.toggle : null,

          tableHeader = children
            ? <TableHeader expanded={expanded} onTouchTap={touchTap}>{children}</TableHeader>
            : null,

          tableRows = data.map((row, index) => {
            return <TableRow {...row} key={index}></TableRow>;
          });

    return (
      <div className={classes}>
        {tableHeader}
        <ul className={((expanded === false )? 'collapsed' : '') + ' table-rows'}>
          {tableRows}
        </ul>
      </div>
    );
  },


  /**
   * Toggle rows
   */
  toggle() {
    const expanded = !this.state.expanded;

    this.setState({
      expanded
    });

    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(expanded);
    }
  }
});


module.exports = Table;