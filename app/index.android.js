/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * 
 * // <WebView source={{uri: 'https://google.com'}} style= {styles.webView} />
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Navigator,
  WebView,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { Button } from 'react-native-material-design';

class AwesomeProject extends Component {
  render() {
    return (
      <Navigator
          initialRoute={{ title: 'Awesome Scene', index: 0 }}
          configureScene={() => {
                            return Navigator.SceneConfigs.FadeAndroid;
                        }}
          renderScene={(route, navigator) =>
            <View style={styles.container}>
        
              <ScrollView style={{width: width}}>
                <View style={{alignItems: 'center'}}>
                <TextInput style={{height: 40, borderColor: 'gray', width: 200}} />
                <Fumi
                  label={'This is a TextInput'}
                  iconClass={FontAwesomeIcon}
                  iconName={'user'}
                  iconColor={'#f95a25'}
                  style={{width: width}}
                />
                <Button
                  value="This is a Button"
                  raised={true}
                  onPress={()=> console.log("I pressed a raised button")}
                  primary='paperPurple'
                  overrides={{backgroundColor: 'paperBlueA100'}}
                />

                </View>
              </ScrollView>
            </View>
          }
          navigationBar={
             <Navigator.NavigationBar
               routeMapper={{
                 LeftButton: (route, navigator, index, navState) =>
                  { return (
                      <Button
                        value="Back"
                        raised={true}
                        onPress={()=> console.log("I pressed a raised button")}
                        primary='paperPurple'
                        overrides={{backgroundColor: 'paperBlueA100'}}
                      />
                    );
                  },
                 RightButton: (route, navigator, index, navState) =>
                   { return (
                      <Button
                        value="Next"
                        raised={true}
                        onPress={()=> console.log("I pressed a raised button")}
                        primary='paperPurple'
                        overrides={{backgroundColor: 'paperBlueA100'}}
                      />
                    );
                  },
                 Title: (route, navigator, index, navState) =>
                   { return (
                      <Text style={styles.welcome}>This is NavigationBar</Text>
                    );
                  },
               }}
               style={{backgroundColor: 'blue'}}
             />
          }
        />

    );
  }
}

let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
  container: {
    marginTop: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: 400,
    width: width
  },
  welcome: {
    flex: 2,
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  webView: {
     height: 320,
     width: width * 0.9
   },
  button: {
    width: 120,
    height: 40,
    backgroundColor: '#039bef',
    color: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scene: {
    flex: 1,
    marginTop: 56
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
