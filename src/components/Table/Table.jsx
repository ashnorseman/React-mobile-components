/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './Table.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';
import TableRow from './TableRow.jsx';


class Table extends Component {

  render() {
    const {
            className,
            data
          } = this.props,

          classes = mixClass({
            'table': true,
            '$': className
          }),

          tableRows = data.map((row, index) => {
            return <TableRow {...row} key={index}></TableRow>;
          });

    return (
      <ul className={classes}>
        {tableRows}
      </ul>
    );
  }
}


Table.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};


Table.defaultProps = {
  data: []
};


export default pureRender(Table);