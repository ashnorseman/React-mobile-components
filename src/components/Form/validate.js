/**
 * Created by AshZhang on 15/10/30.
 */


'use strict';

const VALIDATIONS = ['maxLength', 'minLength', 'max', 'min', 'pattern'],
      emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      telReg = /(^1[3-9]\d{9}$)|(^([08][1-9]\d{1,2}-?)?[2-9]\d{6,7}$)/;


/**
 * Validate a control
 * @param {string} value
 * @param {Object} props
 * @returns {boolean}
 */
function validate({ value, ...props}) {

  // If the control has no value, only test `required`
  if (!value) {
    return !props.required;
  }

  // Special regs
  if (props.type === 'email') {
    return emailReg.test(value);
  } else if (props.type === 'tel') {
    return telReg.test(value);
  }

  // HTML5 validations
  return VALIDATIONS.reduce((valid, validation) => {
    return props[validation]
      ? _isValid(validation, props[validation], value) && valid
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
function _isValid(type, prop, value) {
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


export default validate;