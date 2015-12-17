/**
 * Created by AshZhang on 15/11/9.
 */


import './DropdownMenu.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';


export default class DropDownMenu extends Component {

  render() {
    const {
            active,
            className,
            name,
            text,
            ...props
          } = this.props,

          classes = mixClass({
            'dropdown-menu': true,
            '$': className,
            active
          });

    return (
      <li className={classes} {...props}>
        {text}
      </li>
    );
  }
}

DropDownMenu.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

reactMixin(DropDownMenu.prototype, PureRenderMixin);
