import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import JourneyDetail from './src/pages/JourneyDetails/JourneyDetails';
import JourneyList from './src/pages/JourneyList/JourneyList';
import TicketPurchase from './src/pages/TicketPurchase/TicketPurchase';
import TicketSearch from './src/pages/TicketSearch/TicketSearch';
import UserLogin from './src/pages/UserLogin/UserLogin';
import UserRegistration from './src/pages/UserRegistration/UserRegistration';


const Stack = createNativeStackNavigator();

function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="UserLogin" component={UserLogin} />
      <Stack.Screen name="JourneyList" component={JourneyList} />
        <Stack.Screen name="JourneyDetail" component={JourneyDetail} />
        
        <Stack.Screen name="TicketPurchase" component={TicketPurchase} />
        <Stack.Screen name="TicketSearch" component={TicketSearch} />
        
        <Stack.Screen name="UserRegistration" component={UserRegistration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


