/**
 * Created by AshZhang on 15/12/14.
 */


import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';


export default class ChoiceItem extends Component {

  toggle() {
    if (!this.props.onToggle || this.props.disabled) return;
    this.props.onToggle(this.props.name, !this.props.checked);
  }

  render() {
    const {
          checked,
          disabled,
          name,
          text,
          onToggle
        } = this.props,

      classes = mixClass({
        'choice-item': true,
        'choice-item-checked': checked,
        'choice-item-disabled': disabled
      });

    return (
      <div className={classes} onTouchTap={this.toggle.bind(this)}>
        {text}
      </div>
    );
  }
}

ChoiceItem.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  text: PropTypes.string,

  onToggle: PropTypes.func
};

ChoiceItem.defaultProps = {
  checked: false,
  disabled: false
};

reactMixin(ChoiceItem.prototype, PureRenderMixin);
