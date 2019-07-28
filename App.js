import React from 'react'
import { View } from 'react-native'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import AppStatusBar from './components/AppStatusBar'
import AppNavigation from './components/AppNavigation'
import { heading } from './utils/colors'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <AppStatusBar
            backgroundColor={heading}
            barStyle="light-content" />
          <AppNavigation />
        </View>
      </Provider>
    );
  }
}
