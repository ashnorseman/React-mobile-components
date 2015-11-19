/**
 * Created by AshZhang on 15/10/25.
 */


import './TabBase.less';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';

import mixClass from '../../common/utils/mix-class';
import TabItem from './TabItem';


export default class TabBase extends Component {

  render() {
    const {
            className,
            data,
            type,
            ...props
          } = this.props,

          classes = mixClass({
            'tab'  : true,
            'tab-$': type,
            '$'    : className
          }),

          tabList = data.map((tab, index) => {
            return <TabItem {...tab} key={index}/>;
          });

    return (
      <nav className={classes} {...props}>
        <div className="tab-inner">
          {tabList}
        </div>
      </nav>
    );
  }
}

TabBase.propTypes = {
  className: PropTypes.string,
  data     : PropTypes.arrayOf(PropTypes.object),
  type     : PropTypes.string,
  tabBar   : PropTypes.bool,
  tabNav   : PropTypes.bool
};

reactMixin(TabBase.prototype, PureRenderMixin);
