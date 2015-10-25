/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './TableRow.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import Icon from '../Icon/Icon.jsx';


class TableRow extends Component {

  render() {
    const { disclosure, href, text } = this.props,
          arrowIcon = disclosure
            ? <Icon name='arrow-right'></Icon>
            : null;

    return (
      <li className='table-row'>
        <a href={href ? `#/${href}` : ''} className='table-row-link'>
          <span className='table-row-text'>{text}</span>
          {arrowIcon}
        </a>
      </li>
    );
  }
}

TableRow.propTypes = {
  text: PropTypes.string.isRequired,
  disclosure: PropTypes.bool,
  href: PropTypes.string
};

TableRow.defaultProps = {
  disclosure: false
};


export default pureRender(TableRow);