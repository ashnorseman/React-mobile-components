/**
 * Created by AshZhang on 15/10/29.
 */


'use strict';

require('./FormControl.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const validate = require('./validate');
const Icon = require('../Icon/Icon.js');


const FormControl = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.arrayOf(React.PropTypes.object),
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      autoComplete: false,
      options: [],
      type: 'text'
    };
  },

  getInitialState() {
    const value = this.props.defaultValue || this.props.value;

    return {
      focused: false,
      hasValue: !!value,
      valid: value
        ? this._validate(value)
        : true
    };
  },

  render() {
    const {
            className,
            options,
            placeholder,
            type,
            ...props
          } = this.props,

          {
            focused,
            hasValue,
            valid
          } = this.state,

          classes = mixClass({
            'form-control': true,
            'form-focused': focused,
            'form-has-value': hasValue,
            'form-no-value': !hasValue,
            'form-error': !valid,
            '$': className
          }),

          clear = (type === 'select')
                    ? null
                    : <span className='form-clear' onTouchTap={this.clearControl}>
                        <Icon name='clear'></Icon>
                      </span>;

    let control = null;

    props.ref = 'control';

    // Tuning change and blur callbacks
    props.onChange = this.changeControl;
    props.onBlur = this.blurControl;
    props.onFocus = this.focusControl;

    switch (type) {
    case 'date':
    case 'email':
    case 'number':
    case 'password':
    case 'search':
    case 'tel':
    case 'text':
    case 'time':
    case 'url':
      control = <input type={type} {...props} />;
      break;
    case 'textarea':
      control = <textarea {...props}></textarea>;
      break;
    case 'select':
      let optionNodes = options.map(({ text, opt }, index) => {
        return <option {...opt} key={index}>{text}</option>;
      });
      control = <select {...props}>{optionNodes}</select>;
      break;
    default:
    }

    return (
      <div className={classes}>
        <span className='form-placeholder'>{placeholder}</span>
        {clear}
        {control}
      </div>
    );
  },


  /**
   * Focus the control
   */
  focusControl(e) {
    this.setState({
      focused: true
    });

    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(e);
    }
  },


  /**
   * Blur the control
   */
  blurControl(e) {
    this.setState({
      focused: false,
      valid: this._validate(e.currentTarget.value)
    });

    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  },


  /**
   * Toggle `hasValue` and triggers onChange callback
   * @param e
   */
  changeControl(e) {
    this.setState({
      hasValue: e.currentTarget.value
    });

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e);
    }
  },


  /**
   * Clear value
   */
  clearControl() {
    this.refs.control.value = '';

    this.changeControl({
      currentTarget: {
        value: ''
      }
    });
  },


  /**
   * Validate a control
   * @param {string} value
   * @returns {boolean}
   * @private
   */
  _validate(value) {
    const props = this.props;

    return validate({
      value: value.toString().trim(),
      ...props
    });
  }
});


module.exports = FormControl;