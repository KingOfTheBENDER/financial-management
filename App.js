import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator,createAppContainer,createStackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements'
import firebase from 'firebase';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers'


import OperationScreen from './screens/OperationScreen';
import AddOperationScreen from './screens/AddOperationScreen';
import GraphicScreen from './screens/GraphicScreen';
import TableScreen from './screens/TableScreen';

const MainNavigator=createBottomTabNavigator({
    operation:{
        screen:createStackNavigator({
            operation: OperationScreen,
            add: AddOperationScreen
        }),
        navigationOptions:{
            title:'Операции',
            tabBarIcon:({tintColor}) => {
                return (<Icon name="home" size={30} color={tintColor} />);
            }
        }
    },
    table: {
        screen:TableScreen,
        navigationOptions:{
            title:'Таблица',
            tabBarIcon:({tintColor}) => {
                return (<Icon name="view-list" size={30} color={tintColor} />);
            }
        }
    },
    graphic: {
        screen:GraphicScreen,
        navigationOptions:{
            title:'График',
            tabBarIcon:({tintColor}) => {
                return (<Icon name="trending-up" size={30} color={tintColor} />);
            }
        }
    }

});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  componentWillMount(){
      const config = {
          apiKey: "AIzaSyCmLHkMb_uBAz7_QBUwe_tc3l8UrH2TJVk",
          authDomain: "financial-management-dd7dc.firebaseapp.com",
          databaseURL: "https://financial-management-dd7dc.firebaseio.com",
          projectId: "financial-management-dd7dc",
          storageBucket: "financial-management-dd7dc.appspot.com",
          messagingSenderId: "551771623898"
      };
      firebase.initializeApp(config);
  }
  render() {
    return (
      <View style={styles.container}>
          <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
            <AppContainer/>
          </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
