/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './TabBase.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';
import Tab from './TabItem.jsx';


class TabBase extends Component {

  render() {
    const {
            className,
            data,
            type
          } = this.props,

          classes = mixClass({
            'tab': true,
            'tab-$': type,
            '$': className
          }),

          tabList = data.map((tab) => {
            return <Tab {...tab} key={tab.link}></Tab>;
          });

    return (
      <nav className={classes}>
        {tabList}
      </nav>
    );
  }
}

TabBase.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  tabBar: PropTypes.bool,
  tabNav: PropTypes.bool
};

TabBase.defaultProps = {
  tabBar: false,
  tabNav: false
};


export default pureRender(TabBase);