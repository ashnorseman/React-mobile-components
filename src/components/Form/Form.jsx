/**
 * Created by AshZhang on 15/10/30.
 */


'use strict';

import './Form.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';
import validate from './validate';
import FormControl from './FormControl.jsx';
import Button from '../Button/Button.jsx';


class Form extends Component {

  constructor(props) {
    super(props);
    this.onControlChange = this.onControlChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      controls: this.props.controls,
      submitting: false
    };

    this.state.valid = this._validate(this.state.controls);
  }

  componentDidMount() {
    if (this.props.submitAtPageBottom) {
      document.body.firstElementChild.classList.add('form-submit-bottom-mounted');
    }
  }

  componentWillUnmount() {
    if (this.props.submitAtPageBottom) {
      document.body.firstElementChild.classList.remove('form-submit-bottom-mounted');
    }
  }

  render() {
    const {
            action,
            submitAtPageBottom,
            submitText,
            ...props
          } = this.props,

          {
            controls,
            submitting,
            valid
          } = this.state,

          formLines = controls.map(({ label, onChange, ...control }, index) => {
            const labelSpan = label ? <span className='form-label'>{label}</span> : null;

            return (
              <div className='form-line' key={index}>
                {labelSpan}
                <FormControl {...control} onChange={this.onControlChange.bind(null, control.name, onChange)} />
              </div>
            );
          }),

          submitClass = mixClass({
            'form-submit': true,
            'form-submit-bottom': submitAtPageBottom
          });

    return (
      <form action={action} {...props} onSubmit={this.onFormSubmit}>
        <div className='form-main'>
          {formLines}
        </div>
        <div className={submitClass}>
          <Button type='submit' disabled={!valid || submitting}>{submitText}</Button>
        </div>
      </form>
    );
  }


  /**
   * The control value changes
   * @param {string} name
   * @param {Function} cb
   * @param {Object} e
   */
  onControlChange(name, cb, e) {
    const control = this.state.controls.filter((control) => {
      return control.name === name;
    })[0];

    control.value = e.currentTarget.value;

    this.setState({
      valid: this._validate(this.state.controls)
    });

    if (typeof cb === 'function') {
      cb(e);
    }
  }


  /**
   * Submit the form
   * @param {Object} e
   */
  onFormSubmit(e) {
    e.preventDefault();

    let formData,
        canSubmit = true;

    if (this._validate(this.state.controls)) {
      formData = this._getFormData();

      // Return false will prevent the form from being submitted
      if (typeof this.props.beforeSubmit === 'function') {
        canSubmit = (this.props.beforeSubmit(formData) !== false);
      }

      if (canSubmit && (typeof this.props.onSubmit === 'function')) {
        this.setState({
          submitting: true
        });
        this.props.onSubmit(formData, this);
      }
    }
  }


  /**
   * Get form data
   * @returns {Object}
   * @private
   */
  _getFormData() {
    let formData = {};

    this.state.controls.forEach((control) => {
      formData[control.name] = (control.value !== undefined) ? control.value : control.defaultValue;
    });

    return formData;
  }


  /**
   * Validate controls
   * @param {Array} controls
   * @returns {boolean}
   * @private
   */
  _validate(controls) {
    return controls.every(({ defaultValue, value, ...props }) => {
      return validate({
        value: (value !== undefined) ? value : defaultValue,
        ...props
      });
    });
  }
}


Form.propTypes = {
  action: PropTypes.string,
  onSubmit: PropTypes.func,
  beforeSubmit: PropTypes.func,
  className: PropTypes.string,
  controls: PropTypes.arrayOf(PropTypes.object),
  submitAtPageBottom: PropTypes.bool,
  submitText: PropTypes.string.isRequired
};

Form.defaultProps = {
  submitText: '提交'
};


export default pureRender(Form);