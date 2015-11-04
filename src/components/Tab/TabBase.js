/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

require('./TabBase.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const TabItem = require('./TabItem.js');


const TabBase = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    className: React.PropTypes.string,
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    tabBar: React.PropTypes.bool,
    tabNav: React.PropTypes.bool
  },

  getDefaultProps() {
    return  {
      tabBar: false,
      tabNav: false
    };
  },

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

          tabList = data.map((tab, index) => {
            return <TabItem {...tab} key={index}></TabItem>;
          });

    return (
      <nav className={classes}>
        <div className='tab-inner'>
          {tabList}
        </div>
      </nav>
    );
  }
});


module.exports = TabBase;