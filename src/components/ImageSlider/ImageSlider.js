/**
 * Created by AshZhang on 15/10/28.
 */


'use strict';

import './ImageSlider.less';

const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const CSSTransitionGroup = require('react-addons-css-transition-group');
const { Swiper } = require('react-swiper-ash');

const mixClass = require('../../common/utils/mix-class');


const ImageSlider = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  },

  getDefaultProps() {
    return {
      data: []
    };
  },

  getInitialState() {
    return {
      activeIndex: 0,
      zoomed: false
    };
  },

  render() {
    const { data } = this.props,

          {
            activeIndex,
            direction,
            zoomed
          } = this.state,

          classes = mixClass({
            'image-slider': true,
            'zoomed': zoomed
          }),

          imageList = data.map((image, index) => {
            if (index === activeIndex) {
              return (
                <div className='image-slider-item' style={{
                  backgroundImage: `url(${image})`
                }} key={index}></div>
              );
            } else {
              return null;
            }
          }),

          dotList = (data.length > 1) ? data.map((image, index) => {
            const classes = mixClass({
                    'image-slider-dot': true,
                    'active': index === activeIndex
                  });

            return <li className={classes} key={index}></li>;
          }) : null;

    return (
      <Swiper onSwipe={this.setActive}>
        <div className={classes} onTouchTap={this.toggleZoom}>
          <CSSTransitionGroup transitionName={`image-slider-${direction}`}
                              transitionEnterTimeout={500}
                              transitionLeaveTimeout={500}>
            {imageList}
          </CSSTransitionGroup>

          <ul className='image-slider-dots'>
            {dotList}
          </ul>
        </div>
      </Swiper>
    );
  },


  /**
   * Swipe to set next active image
   * @param e
   */
  setActive(e) {
    if (e.direction === 'left') {
      this._setNextActive();
    } else if (e.direction === 'right') {
      this._setPrevActive();
    }
  },


  /**
   * Swipe from right to left
   * @private
   */
  _setNextActive() {
    let nextActive = this.state.activeIndex + 1;

    if (nextActive >= this.props.data.length) {
      nextActive = 0;
    }

    this.setState({
      activeIndex: nextActive,
      direction: 'left'
    });
  },


  /**
   * Swipe from left to right
   * @private
   */
  _setPrevActive() {
    let nextActive = this.state.activeIndex - 1;

    if (nextActive < 0) {
      nextActive = this.props.data.length - 1;
    }

    this.setState({
      activeIndex: nextActive,
      direction: 'right'
    });
  },

  /**
   * Zoom / Unzoom
   */
  toggleZoom() {
    const zoomed = !this.state.zoomed;

    this.setState({
      zoomed: zoomed,
      translateY: window.innerHeight / ReactDOM.findDOMNode(this).offsetHeight
    });
  }
});


module.exports = ImageSlider;