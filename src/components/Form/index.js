/**
 * Created by AshZhang on 15/10/30.
 */


import './Form.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import validate from './validate';
import FormControl from './FormControl';
import Button from '../Button';


export default class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      valid: this._validate(this.props.controls),
      submitting: false
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
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


  /**
   * The control value changes
   * @param {Function} cb
   * @param {string} name
   * @param {string} value
   */
  onControlChange(cb, name, value) {
    this.setState({
      valid: this._validate(this.props.controls)
    });

    if (typeof cb === 'function') {
      cb(name, value);
    }

    if (this.props.onControlChange) {
      this.props.onControlChange(name, value);
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

    if (this._validate(this.props.controls)) {
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
    return this.props.controls.reduce((formData, control) => {
      formData[control.name] = control.value;
      return formData;
    }, {});
  }


  /**
   * Validate controls
   * @param {Array} controls
   * @returns {boolean}
   * @private
   */
  _validate(controls) {
    return controls.every(({ value, ...props }) => {
      return validate({
        value,
        ...props
      });
    });
  }


  render() {
    const {
        action,
        submitAtPageBottom,
        submitText,
        controls,
        ...props
      } = this.props,

      {
        submitting,
        valid
      } = this.state,

      formLines = controls.map(({ label, onChange, ...control }, index) => {
        const labelSpan = label ? <span className="form-label">{label}</span> : null;

        return (
          <div className="form-line" key={index}>
            {labelSpan}
            <FormControl {...control} onChange={this.onControlChange.bind(this, onChange)} />
          </div>
        );
      }),

      submitClass = mixClass({
        'form-submit': true,
        'form-submit-bottom': submitAtPageBottom
      });

    return (
      <form action={action} {...props} onSubmit={this.onFormSubmit}>
        <div className="form-main">
          {formLines}
        </div>
        <div className={submitClass}>
          <Button type="submit" disabled={!valid || submitting}>{submitText}</Button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  action: PropTypes.string,
  className: PropTypes.string,
  controls: PropTypes.arrayOf(PropTypes.object),
  submitAtPageBottom: PropTypes.bool,
  submitText: PropTypes.string.isRequired,

  onSubmit: PropTypes.func,
  beforeSubmit: PropTypes.func,
  onControlChange: PropTypes.func
};

Form.defaultProps = {
  submitText: '提交'
};


/**
 * Update control value
 * @param {[Object]} controls
 * @param {string} name
 * @param {string} value
 */
Form.updateValue = (controls, name, value) => {
  const control = controls.filter((c) => {
          return c.name === name;
        })[0],
        index = controls.indexOf(control);

  control.value = value;

  controls.splice(index, 1, Object.keys(control).reduce((c, key) => {
    c[key] = control[key];
    return c;
  }, {}));
};
