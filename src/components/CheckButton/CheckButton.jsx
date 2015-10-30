/**
 * Created by AshZhang on 15/10/30.
 */


'use strict';

import './CheckButton.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon.jsx';


class CheckButton extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      checked: this.props.checked
    };
  }

  render() {
    const {
            children,
            className,
            onToggle,
            ...props
          } = this.props,

          { checked } = this.state,

          classes = mixClass({
            'btn': true,
            'btn-link': true,
            'check-btn-checked': checked,
            '$': className
          });

    return (
      <button type='button' className={classes} {...props} onTouchTap={this.toggle}>
        <Icon name={checked ? 'checked' : 'unchecked'}></Icon>
        {children}
      </button>
    );
  }


  /**
   * Toggle checked status
   */
  toggle() {
    const checked = !this.state.checked;

    this.setState({
      checked: checked
    });

    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(checked);
    }
  }
}


CheckButton.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  children: PropTypes.node,
  onToggle: PropTypes.func
};


export default pureRender(CheckButton);