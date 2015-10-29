/**
 * Created by AshZhang on 15/10/29.
 */


'use strict';

import './FormControl.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';


const VALIDATIONS = ['maxLength', 'minLength', 'max', 'min', 'pattern'],
      emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      telReg = /(^1[3-9]\d{9}$)|(^([08][1-9]\d{1,2}-?)?[2-9]\d{6,7}$)/;

class FormControl extends Component {

  constructor(props) {
    super(props);
    this.focusControl = this.focusControl.bind(this);
    this.blurControl = this.blurControl.bind(this);
    this.changeControl = this.changeControl.bind(this);
    this._validate = this._validate.bind(this);

    const value = this.props.defaultValue || this.props.value;

    this.state = {
      focused: false,
      hasValue: !!value,
      valid: value
                ? this._validate(value)
                : true
    };
  }

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
          });

    let control = null;

    props.ref = 'control';

    // Tuning change and blur callbacks
    props.onChange = this.changeControl;
    props.onBlur = this.blurControl;

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
        <span className='form-placeholder' onTouchTap={this.focusControl}>{placeholder}</span>
        {control}
      </div>
    );
  }


  /**
   * Focus the control
   */
  focusControl() {
    this.refs.control.focus();

    this.setState({
      focused: true
    });
  }


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
  }


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
  }


  /**
   * Validate a control
   * @param {string} value
   * @returns {boolean}
   * @private
   */
  _validate(value) {
    value = value.trim();

    // If the control has no value, only test `required`
    if (!value) {
      return !this.props.required;
    }

    // Special regs
    if (this.props.type === 'email') {
      return emailReg.test(value);
    } else if (this.props.type === 'tel') {
      return telReg.test(value);
    }

    // HTML5 validations
    return VALIDATIONS.reduce((valid, validation) => {
      return this.props[validation]
                ? this._isValid(validation, this.props[validation], value) && valid
                : valid;
    }, true, this);
  }


  /**
   * Validate a single criteria
   * @param {string} type
   * @param {string} prop
   * @param {string} value
   * @returns {boolean}
   * @private
   */
  _isValid(type, prop, value) {
    switch (type) {
    case 'maxLength':
      return value.length <= +prop;
    case 'minLength':
      return value.length >= +prop;
    case 'max':
      return +value <= +prop;
    case 'min':
      return +value >= +prop;
    case 'pattern':
      return new RegExp(prop).test(value);
    default:
      return true;
    }
  }
}


FormControl.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired
};

FormControl.defaultProps = {
  options: [],
  type: 'text'
};


export default pureRender(FormControl);