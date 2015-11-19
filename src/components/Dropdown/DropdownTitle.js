/**
 * Created by AshZhang on 15/11/9.
 */


import './DropdownTitle.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon';


export default class DropdownTitle extends Component {

  render() {
    const {
            active,
            className,
            name,
            opened,
            text,
            ...props
          } = this.props,

          classes = mixClass({
            'dropdown-title': true,
            active,
            opened,
            '$': className
          });

    return (
      <div className={classes} {...props}>
        {text}
        <Icon name="arrow-down" />
      </div>
    );
  }
}

DropdownTitle.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  opened: PropTypes.bool,
  text: PropTypes.string.isRequired
};

reactMixin(DropdownTitle.prototype, PureRenderMixin);
