import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import User from './src/models/User';
import AsyncStorageUser from './src/utils/AsyncStorageUser';
import { UserContext } from './src/contexts/UserContext';
import FlashMessage from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';
import Nav from './src/navigations/Nav';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState<User>();

  const [fontsLoaded, fontError] = useFonts({
    'avantt': require('./src/assets/fonts/avantt/Avantt-Regular.otf'),
    'avantt-bold': require('./src/assets/fonts/avantt/Avantt-Bold.otf'),
    'avantt-semibold': require('./src/assets/fonts/avantt/Avantt-SemiBold.otf'),
    'brother': require('./src/assets/fonts/brother/Brother1816-Regular.ttf'),
    'brother-bold': require('./src/assets/fonts/brother/Brother1816-Bold.ttf'),
    'brother-light-italic': require('./src/assets/fonts/brother/Brother1816-LightItalic.ttf'),
  });

  // on récupère les données de l'utilisateur dans le local storage
  function getUserFromStorage() {
    console.log('Getting user from storage...');
    AsyncStorageUser.getUser().then(resp => {
      if (resp.email) {
        setUserData(resp);
        setIsLogin(true);
      }
      else {
        setUserData(undefined);
        setIsLogin(false);
      }
    })
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      console.log('Hiding splash screen...');
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    getUserFromStorage();
    //AsyncStorageUser.Logout();
  }, []);

  useEffect(() => {
    console.log('Is login:', isLogin);
    console.log('User data:', userData);
    if (!userData)
      setIsLogin(false);
  }, [userData, isLogin]);


  if (!fontsLoaded && !fontError) {
    console.log('Loading fonts...');
    return null;
  }

  return (
    <NavigationContainer>
      <UserContext.Provider
        value={[userData, setUserData]}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <StatusBar style="auto" />
          {
            isLogin ? (
              <Nav screenToDisplay="Home" />
            ) : (
              <Nav screenToDisplay="Landing" />
            )
          }
          <FlashMessage position="top" statusBarHeight={40} />
        </View>
      </UserContext.Provider>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

