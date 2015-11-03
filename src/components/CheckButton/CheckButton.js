/**
 * Created by AshZhang on 15/10/30.
 */


'use strict';

require('./CheckButton.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const Icon = require('../Icon/Icon.js');


const CheckButton = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    checked: React.PropTypes.bool,
    children: React.PropTypes.node,
    onToggle: React.PropTypes.func
  },

  getInitialState() {
    return {
      checked: this.props.checked
    };
  },

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
  },


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
});


module.exports = CheckButton;