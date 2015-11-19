/**
 * Created by AshZhang on 15/10/28.
 */


import './ImageSlider.less';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import reactMixin from 'react-mixin';
import { Swiper } from 'react-swiper-ash';

import mixClass from '../../common/utils/mix-class';


export default class ImageSlider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      zoomed     : false
    };
  }

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
  }


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
  }


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
  }


  /**
   * Zoom / Unzoom
   */
  toggleZoom() {
    const zoomed = !this.state.zoomed;

    this.setState({
      zoomed,
      translateY: window.innerHeight / ReactDOM.findDOMNode(this).offsetHeight
    });
  }

  render() {
    const { data } = this.props,

          {
            activeIndex,
            direction,
            zoomed
          } = this.state,

          classes = mixClass({
            'image-slider': true,
            zoomed
          }),

          imageList = data.map((image, index) => {
            if (index === activeIndex) {
              return (
                <div className="image-slider-item" style={{
                  backgroundImage: `url(${image})`
                }} key={index} />
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

            return <li className={classes} key={index} />;
          }) : null;

    return (
      <Swiper onSwipe={this.setActive.bind(this)}>
        <div className={classes} onTouchTap={this.toggleZoom.bind(this)}>
          <CSSTransitionGroup transitionName={`image-slider-${direction}`}
                              transitionEnterTimeout={500}
                              transitionLeaveTimeout={500}>
            {imageList}
          </CSSTransitionGroup>

          <ul className="image-slider-dots">
            {dotList}
          </ul>
        </div>
      </Swiper>
    );
  }
}

ImageSlider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired
};

ImageSlider.defaultProps = {
  data: []
};

reactMixin(ImageSlider.prototype, PureRenderMixin);
