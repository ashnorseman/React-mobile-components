/**
 * Created by AshZhang on 15/11/10.
 */


import './Mask.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';


const _maskHolder = document.createElement('div');
document.body.appendChild(_maskHolder);


class Mask extends Component {

  render() {
    const {
            onTouchTap,
            zIndex
          } = this.props,

          style = zIndex ? { zIndex } : null;

    return (
      <div className="mask" style={style} onTouchTap={onTouchTap} />
    );
  }
}

Mask.propTypes = {
  onTouchTap: React.PropTypes.func,
  zIndex    : React.PropTypes.number
};

reactMixin(Mask.prototype, PureRenderMixin);


export default {

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
