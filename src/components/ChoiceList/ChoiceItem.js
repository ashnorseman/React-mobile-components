/**
 * Created by AshZhang on 15/12/14.
 */


import './ChoiceItem.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';


/**
 * Toggle checked status
 * @param {Object} props
 */
function toggle(props) {
  if (!props.onToggle || props.disabled) return;

  props.onToggle(props.name, !props.checked);
}


export default function ChoiceItem({
  checked,
  disabled,
  name,
  text,
  onToggle,
  ...props
}) {
  const classes = mixClass({
      'choice-item': true,
      'choice-item-checked': checked,
      'choice-item-disabled': disabled
    });

  return (
    <div className={classes}
         {...props}
         onTouchTap={toggle.bind(null, arguments[0])}>
      {text}
    </div>
  );
}


ChoiceItem.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  text: PropTypes.string,

  onToggle: PropTypes.func
};

ChoiceItem.defaultProps = {
  checked: false,
  disabled: false
};
