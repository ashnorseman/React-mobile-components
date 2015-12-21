/**
 * Created by AshZhang on 15/10/25.
 */


import './TabBase.less';

import React, { Component, PropTypes } from 'react';

import mixClass from '../../common/utils/mix-class';
import TabItem from './TabItem';


export default function TabBase({
  className,
  data,
  type,
  ...props
}) {
  const classes = mixClass({
      'tab'  : true,
      'tab-$': type,
      '$'    : className
    }),

    tabList = data.map((tab, index) => {
      return <TabItem key={index} {...tab} />;
    });

  return (
    <nav className={classes} {...props}>
      <div className="tab-inner">
        {tabList}
      </div>
    </nav>
  );
}

TabBase.propTypes = {
  className: PropTypes.string,
  data     : PropTypes.arrayOf(PropTypes.object),
  type     : PropTypes.string,
  tabBar   : PropTypes.bool,
  tabNav   : PropTypes.bool
};
