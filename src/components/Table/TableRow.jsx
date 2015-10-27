/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './TableRow.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon.jsx';


class TableRow extends Component {

  render() {
    const {
            children,
            className,
            disclosure,
            href,
            text
          } = this.props,

          classes = mixClass({
            'table-row': true,
            '$': className
          }),

          arrowIcon = disclosure
            ? <Icon name='arrow-right'></Icon>
            : null;

    return (
      <li className={classes}>
        <a href={href ? `#/${href}` : ''} className='table-row-link clearfix'>
          <span className='table-row-text'>{text}</span>
          <span className='table-row-content'>{children}</span>
          {arrowIcon}
        </a>
      </li>
    );
  }
}

TableRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  disclosure: PropTypes.bool,
  href: PropTypes.string,
  text: PropTypes.string.isRequired
};

TableRow.defaultProps = {
  disclosure: false
};


export default pureRender(TableRow);