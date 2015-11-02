/**
 * Created by AshZhang on 15/11/2.
 */


'use strict';

import './TableHeader.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon.jsx';


class TableHeader extends Component {

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
}


TableHeader.propTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool
};


export default pureRender(TableHeader);