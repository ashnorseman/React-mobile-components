/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './Table.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';
import TableHeader from './TableHeader.jsx';
import TableRow from './TableRow.jsx';


class Table extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      expanded: this.props.expanded
    };
  }

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
  }


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
}


Table.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func
};


Table.defaultProps = {
  data: []
};


export default pureRender(Table);