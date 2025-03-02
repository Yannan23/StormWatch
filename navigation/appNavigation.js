import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import HomeScreen from 'screens/HomeScreen';

import { createNativeStackNavigator } from '../../myApp/node_modules/@react-navigation/native-stack/lib/module/navigators/createNativeStackNavigator';

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
