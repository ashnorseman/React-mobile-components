/**
 * Created by AshZhang on 15/10/27.
 */


'use strict';

import './Button.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';
import Icon from '../Icon/Icon.jsx';


class Button extends Component {

  render() {
    const {
            children,
            className,
            icon,
            link,
            ...props
          } = this.props,

          classes = mixClass({
            'btn': true,
            'btn-link': link,
            '$': className
          }),

          iconNode = icon
            ? <Icon name={icon}></Icon>
            : null;

    return (
      <button className={classes} {...props}>
        {iconNode}
        {children}
      </button>
    );
  }
}


Button.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired
};

Button.defaultProps = {
  type: 'button'
};


export default pureRender(Button);