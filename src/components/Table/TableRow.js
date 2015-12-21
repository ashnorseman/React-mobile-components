/**
 * Created by AshZhang on 15/10/25.
 */


import './TableRow.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon';


export default function TableRow({
  children,
  className,
  disclosure,
  href,
  note,
  text,
  ...props
}) {
  const classes = mixClass({
      'table-row': true,
      '$': className
    }),

    noteNode = note
      ? <div className="table-row-note">{note}</div>
      : null,

    arrowIcon = disclosure
      ? <Icon name="arrow-right" />
      : null;

  return (
    <li className={classes} {...props}>
      <a href={href ? `#/${href}` : null}
         className="table-row-link clearfix">
        <div className="table-row-left">
          <div className="table-row-text">{text}</div>
          {noteNode}
        </div>
        <span className="table-row-content">{children}</span>
        {arrowIcon}
      </a>
    </li>
  );
}

TableRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  disclosure: PropTypes.bool,
  href: PropTypes.string,
  note: PropTypes.string,
  text: PropTypes.string.isRequired
};
