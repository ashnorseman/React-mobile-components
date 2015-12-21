/**
 * Created by AshZhang on 15/10/29.
 */


import './FormControl.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import validate from './validate';
import Icon from '../Icon/Icon';


export default class FormControl extends Component {

  constructor(props) {
    super(props);

    this._validate = this._validate.bind(this);

    this.state = {
      focused: false
    };
  }

  /**
   * Focus the control
   */
  focusControl(e) {
    this.setState({
      focused: true
    });

    document.body.classList.add('form-control-focused');

    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(e);
    }
  }


  /**
   * Blur the control
   */
  blurControl(e) {
    this.setState({
      focused: false
    });

    document.body.classList.remove('form-control-focused');

    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }
  }


  /**
   * Toggle `hasValue` and triggers onChange callback
   * @param e
   */
  changeControl(e) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.name, e.currentTarget.value);
    }
  }


  /**
   * Clear value
   */
  clearControl() {
    this.changeControl({
      currentTarget: {
        value: ''
      }
    });
  }


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


  render() {
    const {
        className,
        options,
        placeholder,
        type,
        ...props
      } = this.props,

      {
        focused
      } = this.state,

      hasValue = !!props.value,

      valid = (props.value && !focused) ? this._validate(props.value) : true,

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
        : <span className="form-clear" onTouchTap={this.clearControl.bind(this)}>
            <Icon name="close" />
          </span>;

    let control = null;

    // Tuning change and blur callbacks
    props.onChange = this.changeControl.bind(this);
    props.onBlur = this.blurControl.bind(this);
    props.onFocus = this.focusControl.bind(this);

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
      control = <textarea {...props} />;
      break;
    case 'select':
      let optionNodes = options.map(({ text, value }, index) => {
            return <option value={value} key={index}>{text}</option>;
          });
      control = <select {...props}>{optionNodes}</select>;
      break;
    default:
    }

    return (
      <div className={classes}>
        <span className="form-placeholder">{placeholder}</span>
        {clear}
        {control}
      </div>
    );
  }
}

FormControl.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,

  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

FormControl.defaultProps = {
  autoComplete: false,
  options: [],
  type: 'text'
};
