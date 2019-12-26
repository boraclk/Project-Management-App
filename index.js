/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
// import App from '~/App';
import { name as appName } from './app.json';
import SplashScreen from '~/SplashScreen';

YellowBox.ignoreWarnings(['componentWillReceiveProps has been renamed, and is not recommended for use.']);
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);
AppRegistry.registerComponent(appName, () => SplashScreen);
