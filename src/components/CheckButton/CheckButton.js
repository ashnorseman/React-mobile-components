/**
 * Created by AshZhang on 15/10/30.
 */


import './CheckButton.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon';


export default class CheckButton extends Component {


  /**
   * Toggle checked status
   */
  toggle() {
    const checked = !this.props.checked;

    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(checked);
    }
  }


  render() {
    const {
            checked,
            children,
            className,
            onToggle,
            ...props
          } = this.props,

          classes = mixClass({
            'btn': true,
            'btn-link': true,
            'check-btn': true,
            'check-btn-checked': checked,
            '$': className
          });

    return (
      <button type="button"
              className={classes}
              {...props}
              onTouchTap={this.toggle.bind(this)}>
        <Icon name={checked ? 'checked' : 'unchecked'} />
        {children}
      </button>
    );
  }
}

CheckButton.propTypes = {
  className: PropTypes.string,
  checked  : PropTypes.bool,
  children : PropTypes.node,
  onToggle : PropTypes.func
};

reactMixin(CheckButton.prototype, PureRenderMixin);
