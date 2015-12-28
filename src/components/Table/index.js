/**
 * Created by AshZhang on 15/10/25.
 */


import './Table.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import TableHeader from './TableHeader';
import TableRow from './TableRow';


export default class Table extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: this.props.expanded
    };
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

      touchTap = (expanded !== undefined) ? this.toggle.bind(this) : null,

      tableHeader = children
        ? <TableHeader expanded={expanded} onTouchTap={touchTap}>{children}</TableHeader>
        : null,

      tableRows = data.map((row, index) => {
        return <TableRow {...row} key={index} />;
      });

    return (
      <div className={classes}>
        {tableHeader}
        <ul className={((expanded === false ) ? 'collapsed' : '') + ' table-rows'}>
          {tableRows}
        </ul>
      </div>
    );
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
