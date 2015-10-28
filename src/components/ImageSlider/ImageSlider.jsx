/**
 * Created by AshZhang on 15/10/28.
 */


'use strict';

import './ImageSlider.less';

import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import swipe from 'react-swiper-ash';

import pureRender from '../../common/utils/pure-render';
import mixClass from '../../common/utils/mix-class';


// Slider Base
// ---------------------------

const ImageSliderBase = swipe(class ImageSliderBase extends Component {

  constructor(props) {
    super(props);
    this.toggleZoom = this.toggleZoom.bind(this);

    this.state = {
      zoomed: false
    };
  }

  render() {
    const {
            activeIndex,
            data,
            direction
          } = this.props,

          { zoomed } = this.state,

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
      <div className={classes} onTouchTap={this.toggleZoom}>
        <CSSTransitionGroup transitionName={`image-slider-${direction}`} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {imageList}
        </CSSTransitionGroup>

        <ul className='image-slider-dots'>
          {dotList}
        </ul>
      </div>
    );
  }


  /**
   * Zoom / Unzoom
   */
  toggleZoom() {
    this.setState({
      zoomed: !this.state.zoomed
    });
  }
});

ImageSliderBase.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  direction: PropTypes.string
};

ImageSliderBase.defaultProps = {
  activeIndex: 0,
  data: []
};


// Image Slider
// ---------------------------

class ImageSlider extends Component {

  constructor(props) {
    super(props);
    this.setActive = this.setActive.bind(this);
    this._setNextActive = this._setNextActive.bind(this);
    this._setPrevActive = this._setPrevActive.bind(this);

    this.state = {
      activeIndex: 0
    };
  }

  render() {
    return (
      <ImageSliderBase {...this.props} {...this.state}
        onSwipe={this.setActive}></ImageSliderBase>
    );
  }


  /**
   * Swipe to set next active image
   * @param e
   */
  setActive(e) {
    if (e.direction === 'left') {
      this._setNextActive();
    } else {
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
}


export default pureRender(ImageSlider);