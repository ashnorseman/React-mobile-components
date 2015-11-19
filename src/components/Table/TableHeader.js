/**
 * Created by AshZhang on 15/11/2.
 */


import './TableHeader.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon';


export default class TableHeader extends Component {

  render() {
    const {
            children,
            className,
            expanded,
            ...props
          } = this.props,

          classes = mixClass({
            'table-header': true,
            '$'           : className
          }),

          toggle  = (expanded !== undefined)
            ? <Icon name="arrow-down" className={expanded ? 'expanded' : ''}/>
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

reactMixin(TableHeader.prototype, PureRenderMixin);
