/**
 * Test entrance
 */


'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

const srcContext = require.context('../src/components', true, /\.jsx?$/);
srcContext.keys().forEach(srcContext);

const componentContext = require.context('./components', true, /\.js$/);
componentContext.keys().forEach(componentContext);