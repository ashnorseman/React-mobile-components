/**
 * Created by AshZhang on 15/10/29.
 */


import './FormControl.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import mixClass from '../../common/utils/mix-class';
import validate from './validate';
import Icon from '../Icon';


export default class FormControl extends Component {

  constructor(props) {
    super(props);

    this._validate = this._validate.bind(this);
    this._focusControl = this._focusControl.bind(this);
    this._blurControl = this._blurControl.bind(this);

    this.changeControl = this.changeControl.bind(this);
    this.clearControl = this.clearControl.bind(this);
  }

  componentDidMount() {
    const input = ReactDOM.findDOMNode(this).querySelector('input, textarea, select');

    input.addEventListener('focus', this._focusControl, false);
    input.addEventListener('blur', this._blurControl, false);
  }

  componentWillUnmount() {
    const input = ReactDOM.findDOMNode(this).querySelector('input, textarea, select');

    input.removeEventListener('focus', this._focusControl, false);
    input.removeEventListener('blur', this._blurControl, false);
  }

  /**
   * Focus the control
   */
  _focusControl() {
    document.body.classList.add('form-control-focused');
  }


  /**
   * Blur the control
   */
  _blurControl() {
    document.body.classList.remove('form-control-focused');
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

      hasValue = !!props.value,

      valid = props.value ? this._validate(props.value) : true,

      classes = mixClass({
        'form-control': true,
        'form-has-value': hasValue,
        'form-no-value': !hasValue,
        'form-error': !valid,
        '$': className
      }),

      clear = (type === 'select')
        ? null
        : <span className="form-clear" onTouchTap={this.clearControl}>
            <Icon name="close" />
          </span>;

    let control = null;

    // Tuning change callbacks
    props.onChange = this.changeControl;

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
        {clear}
        {control}
        <span className="form-placeholder">{placeholder}</span>
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
