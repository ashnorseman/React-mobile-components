/**
 * Created by AshZhang on 15/10/27.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { ImageBox } from '../../index';


describe('ImageBox', () => {

  it('renders a image box', () => {
    const imageBox = TestUtils.renderIntoDocument(
            <ImageBox src=''></ImageBox>
          ),
          imageBoxNode = ReactDOM.findDOMNode(imageBox);

    expect(imageBoxNode.nodeName).toEqual('DIV');
    expect(imageBoxNode.classList.contains('image-box')).toBeTruthy();
    expect(imageBoxNode.querySelector('img').src).toEqual(location.href);
    expect(imageBoxNode.querySelector('img').alt).toEqual('');
  });
});