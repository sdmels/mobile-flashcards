import React from 'react'
import { Platform } from 'react-native'
import ListDecks from './ListDecks'
import AddCard from './AddCard'
import AddDeck from './AddDeck'
import Quiz from './Quiz'
import DeckContainer from './DeckContainer'
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

const TabConfigs = {
  ListDecks: {
    screen: ListDecks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={25} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={25} color={tintColor} />
    }
  }
}

const TabConfig = {
  tabBarOptions: {
    activeTintColor: '#004346',
    inactiveTintColor: '#46585d',
    labelStyle: {
      fontSize: 14,
    },
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios"
        ? '#b2e6c8'
        : '#aeb9bb',
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
  }
}

const Tabs =
Platform.OS === "ios"
? createBottomTabNavigator(TabConfigs, TabConfig)
: createMaterialTopTabNavigator(TabConfigs, TabConfig);

const TabsContainer = createAppContainer(Tabs)

const AppNavigator = createStackNavigator({
  Home: {
    screen: TabsContainer,
    navigationOptions: {
      header: null,
    }
  },
  DeckContainer: {
    screen: DeckContainer,
    navigationOptions: {
      headerTintColor: '#004346',
      headerTitleStyle: {
        flex: 1,
        justifyContent: 'center'
      },
      headerStyle: {
        backgroundColor: '#eef0f2',
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: '#004346',
      headerTitleStyle: {
        flex: 1,
        justifyContent: 'center'
      },
      headerStyle: {
        backgroundColor: '#eef0f2',
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: '#004346',
      headerTitleStyle: {
        flex: 1,
        justifyContent: 'center'
      },
      headerStyle: {
        backgroundColor: '#eef0f2',
      }
    }
  }
})

const AppNavigation = createAppContainer(AppNavigator)

export default AppNavigation
