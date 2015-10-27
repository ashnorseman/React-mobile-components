/**
 * Test entrance
 */


'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

const componentContext = require.context('../src/components', true, /\.jsx?$/);
componentContext.keys().forEach(componentContext);

const commonContext = require.context('../src/common', true, /\.jsx?$/);
commonContext.keys().forEach(commonContext);

const testContest = require.context('./unit', true, /\.js$/);
testContest.keys().forEach(testContest);