import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Pick from './components/Pick.tsx';
import Home from './components/Home.tsx';
import Delivery from './components/Deliveries.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base, Typography } from './styles/index.js';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Inventory": "home",
  "Pick Order": "list",
  "Deliveries": "cube",
};

export default function App() {
  return (
    <SafeAreaView style={Base.container}>
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = routeIcons[route.name] || "alert";
                  return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'pink',
            tabBarInactiveTintColor: 'gray',
          })}
        >
              <Tab.Screen name="Inventory" component={Home} />
              <Tab.Screen name="Pick Order" component={Pick} />
              <Tab.Screen name="Deliveries" component={Delivery} />
            </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}
