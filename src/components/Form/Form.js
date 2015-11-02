/**
 * Created by AshZhang on 15/10/30.
 */


'use strict';

import './Form.less';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const validate = require('./validate');
const FormControl = require('./FormControl.js');
const Button = require('../Button/Button.js');


const Form = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    action: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
    beforeSubmit: React.PropTypes.func,
    className: React.PropTypes.string,
    controls: React.PropTypes.arrayOf(React.PropTypes.object),
    submitAtPageBottom: React.PropTypes.bool,
    submitText: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      submitText: '提交'
    };
  },

  getInitialState() {
    return {
      controls: this.props.controls,
      valid: this._validate(this.props.controls),
      submitting: false
    };
  },

  componentDidMount() {
    if (this.props.submitAtPageBottom) {
      document.body.firstElementChild.classList.add('form-submit-bottom-mounted');
    }
  },

  componentWillUnmount() {
    if (this.props.submitAtPageBottom) {
      document.body.firstElementChild.classList.remove('form-submit-bottom-mounted');
    }
  },

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
  },


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
  },


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
  },


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
  },


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
});


module.exports = Form;