/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './Table.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import TableRow from './TableRow.jsx';


class Table extends Component {

  render() {
    const { data } = this.props,
          tableRows = data.map((row, index) => {
            return <TableRow {...row} key={index}></TableRow>;
          });

    return (
      <ul className='table'>
        {tableRows}
      </ul>
    );
  }
}


export default pureRender(Table);