/**
 * Created by AshZhang on 15/10/25.
 */


'use strict';

import './TopAction.less';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const Icon = require('../Icon/Icon.js');


const TopAction = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      visible: window.pageYOffset > 0
    };
  },

  componentDidMount() {
    window.addEventListener('scroll', this._listenToScroll, false);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this._listenToScroll, false);
  },

  render() {
    const { visible } = this.state,

          visibilityStyle = {
            display: visible ? 'block' : 'none'
          };

    return (
      <span className='top-action'
            style={visibilityStyle}
            onTouchTap={this.scrollTop}>
        <Icon name='top'></Icon>
      </span>
    );
  },


  /**
   * Scroll to the top of window
   */
  scrollTop() {
    window.scroll(0, 0);
  },


  /**
   * Only visible when the viewport has been scrolled down
   * @private
   */
  _listenToScroll() {
    this.setState({
      visible: window.pageYOffset > 0
    });
  }
});


module.exports = TopAction;