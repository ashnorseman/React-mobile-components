/**
 * Created by AshZhang on 15/10/27.
 */


'use strict';

require('./ImageBox.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');


const ImageBox = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    alt: React.PropTypes.string,
    className: React.PropTypes.string,
    src: React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      alt: '',
      src: ''
    };
  },

  render() {
    const {
            alt,
            className,
            src
          } = this.props,

          classes = mixClass({
            'image-box': true,
            '$': className
          });

    return (
      <div className={classes}>
        <img className='image-box-pic' src={src} alt={alt} />
      </div>
    );
  }
});


module.exports = ImageBox;