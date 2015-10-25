/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import React, { Component } from 'react';
import shallowCompare from 'react/lib/shallowCompare';


export default (ComponentClass) => {

  return class extends Component {

    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }

    render() {
      return (
        <ComponentClass {...this.props} {...this.state}>
          {this.props.children}
        </ComponentClass>
      );
    }
  };
};