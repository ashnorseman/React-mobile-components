/**
 * Created by AshZhang on 15/11/10.
 */


'use strict';

require('./Mask.less');

const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');


const _maskHolder = document.createElement('div');
document.body.appendChild(_maskHolder);


const Mask = React.createClass({
  mixins: [PureRenderMixin],

  propType: {
    onTouchTap: React.PropTypes.func,
    zIndex: React.PropTypes.number
  },

  render() {
    const {
            onTouchTap,
            zIndex
          } = this.props,

          style = zIndex ? { zIndex } : null;

    return (
      <div className='mask' style={style} onTouchTap={onTouchTap} />
    );
  }
});


module.exports = {

  open(config) {
    ReactDOM.render(
      <Mask {...config} />,
      _maskHolder
    );
  },

  close() {
    ReactDOM.unmountComponentAtNode(_maskHolder);
  }
};