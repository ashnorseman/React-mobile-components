/**
 * Created by AshZhang on 15/11/10.
 */


import './Mask.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';


const _maskHolder = document.createElement('div');
document.body.appendChild(_maskHolder);


function Mask({
  onTouchTap,
  zIndex
}) {
  const style = zIndex ? { zIndex } : null;

  return (
    <div className="mask"
         style={style}
         onTouchTap={onTouchTap} />
  );
}

Mask.propTypes = {
  onTouchTap: React.PropTypes.func,
  zIndex    : React.PropTypes.number
};


export default {

  open(config) {
    ReactDOM.render(
      <Mask {...config} />,
      _maskHolder
    );
  },

  close() {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(_maskHolder);
    }, 15);
  }
};
