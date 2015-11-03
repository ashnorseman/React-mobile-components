/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

require('./TabNav.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const TabBase = require('./TabBase.js');


const TabNav = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return (
      <TabBase {...this.props} {...this.state} type='nav'>
        {this.props.children}
      </TabBase>
    );
  }
});


module.exports = TabNav;