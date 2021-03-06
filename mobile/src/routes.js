import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';

import Feed from './pages/feed';
import New from './pages/new';

import logo from './static/assets/logo.png';

export default createAppContainer(
    createStackNavigator({
        Feed,
        New
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#000000',
            headerTitle: <Image style={{ marginHorizontal: 20 }} source={logo}/>,
            headerBackTitle: null
        },
        mode: 'modal'
    })
);