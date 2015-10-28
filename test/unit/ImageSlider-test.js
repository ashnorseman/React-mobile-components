/**
 * Created by AshZhang on 15/10/28.
 */


'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { ImageSlider } from '../../src/components/index';


describe('ImageSlider', () => {
  const imageData = ['', '', ''];

  it('renders a image slider', () => {
    const imageSlider = TestUtils.renderIntoDocument(
            <ImageSlider data={imageData}></ImageSlider>
          ),
          imageSliderNode = ReactDOM.findDOMNode(imageSlider),
          dots = imageSliderNode.querySelectorAll('.image-slider-dot');

    expect(imageSliderNode.nodeName).toEqual('DIV');
    expect(imageSliderNode.firstElementChild.classList.contains('image-slider')).toBeTruthy();
    expect(imageSliderNode.querySelector('.image-slider-item')).not.toBeNull();
    expect(imageSliderNode.querySelector('.image-slider-dots')).not.toBeNull();

    expect(dots.length).toEqual(3);
    expect(dots[0].classList.contains('active')).toBeTruthy();
    expect(dots[1].classList.contains('active')).toBeFalsy();
  });

  it('expands and shrinks', () => {
    const imageSlider = TestUtils.renderIntoDocument(
            <ImageSlider data={imageData}></ImageSlider>
          ),
          imageSliderNode = ReactDOM.findDOMNode(imageSlider).firstElementChild;

    expect(imageSliderNode.classList.contains('zoomed')).toBeFalsy();

    TestUtils.Simulate.touchTap(imageSliderNode);
    expect(imageSliderNode.classList.contains('zoomed')).toBeTruthy();
  });
});