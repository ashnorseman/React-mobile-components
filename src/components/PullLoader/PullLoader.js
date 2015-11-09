/**
 * Created by AshZhang on 15/10/29.
 */


'use strict';

require('./PullLoader.less');

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const mixClass = require('../../common/utils/mix-class');
const Loading = require('../Loading/Loading');


const PullLoader = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    loading: React.PropTypes.bool,
    onPull: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    window.addEventListener('scroll', this._watchScroll, false);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this._watchScroll, false);
  },

  render() {
    const {
            loading,
            ...props
          } = this.props;

    return (
      <div {...props}>
        {this.props.children}
        { loading && <Loading /> }
      </div>
    );
  },


  /**
   * When page is scrolled to the bottom
   * @private
   */
  _watchScroll() {
    if ((window.scrollY + window.innerHeight >= document.body.clientHeight)
          && (typeof this.props.onPull === 'function')) {
      this.props.onPull.call(this);
    }
  }
});


module.exports = PullLoader;