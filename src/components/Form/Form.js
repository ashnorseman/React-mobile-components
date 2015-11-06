/**
 * Created by AshZhang on 15/10/30.
 */


'use strict';

require('./Form.less');

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
    submitText: React.PropTypes.string.isRequired,
    onControlChange: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      submitText: '提交'
    };
  },

  getInitialState() {
    return {
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
            controls,
            ...props
          } = this.props,

          {
            submitting,
            valid
          } = this.state,

          formLines = controls.map(({ label, onChange, ...control }, index) => {
            const labelSpan = label ? <span className='form-label'>{label}</span> : null;

            return (
              <div className='form-line' key={index}>
                {labelSpan}
                <FormControl {...control} onChange={this.onControlChange.bind(null, onChange)} />
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
  },


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
  },


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
  },


  /**
   * Validate controls
   * @param {Array} controls
   * @returns {boolean}
   * @private
   */
  _validate(controls) {
    return controls.every(({ value, ...props }) => {
      return validate({
        value: value,
        ...props
      });
    });
  }
});


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
    c.key = control[key];
    return c;
  }, {}));
};


module.exports = Form;