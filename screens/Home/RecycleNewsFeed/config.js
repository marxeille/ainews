import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export const trendingGroupItemHeight = deviceHeight * 0.22;

export const newsItemHeight = deviceWidth;
