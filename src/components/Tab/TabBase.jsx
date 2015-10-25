/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './TabBase.less';

import React, { Component, PropTypes } from 'react';

import pureRender from '../../common/utils/pure-render';
import className from '../../common/utils/class-name';
import Tab from './Tab.jsx';


class TabBase extends Component {

  render() {
    const { data, tabBar, tabNav } = this.props,
          classes = className({
            'tab': true,
            'tab-bar': tabBar,
            'tab-nav': tabNav
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
  data: PropTypes.arrayOf(PropTypes.object),
  tabBar: PropTypes.bool,
  tabNav: PropTypes.bool
};

TabBase.defaultProps = {
  tabBar: false,
  tabNav: false
};


export default pureRender(TabBase);