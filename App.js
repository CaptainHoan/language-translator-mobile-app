import { Provider } from 'react-redux';
import { store } from './redux/store';

import HomeScreen from './screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LangOptionsScreen from './screens/LangOptionsScreen';
import SourceLangScreen from './screens/SourceLangScreen';
import TargetLangScreen from './screens/TargetLangScreen';

//creat Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name= "Home" component={HomeScreen} options={{
            headerShown: false
          }}/>
          <Stack.Screen name="Sources" component={SourceLangScreen} 
            options={{
              headerShown: false,
              presentation: "modal"
            }}
          />
          <Stack.Screen name="Targets" component={TargetLangScreen} 
            options={{
              headerShown: false,
              presentation: "modal"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}


