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
import { useState, useEffect } from 'react';
import Auth from './components/auth/Auth.tsx';
import authModel from './models/auth.ts';
import Invoices from './components/auth/Invoices.tsx'
import CreateInvoice from './components/auth/CreateInvoice.tsx';
import Ship from './components/Ship.tsx';
import FlashMessage from 'react-native-flash-message';


const Tab = createBottomTabNavigator();

const routeIcons = {
  "Inventory":      "home",
  "Pick Order":     "list",
  "Deliveries":     "cube",
  "Login":          "key",
  "Invoices":       "copy",
  "Ship":           "map"
};


export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(async () => {
        setIsLoggedIn(await authModel.loggedIn())
    }, []);

    return (
        <NavigationContainer>
            <SafeAreaView style={Base.container}>

                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName = routeIcons[route.name] || "alert";
                      return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'pink',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
              })}
            >
                <Tab.Screen name="Inventory" component={Home}/>
                <Tab.Screen name="Pick Order" component={Pick} />
                <Tab.Screen name="Deliveries" component={Delivery} />
                {isLoggedIn ?
                    <Tab.Screen name="Invoices" component={Invoices} /> :
                    <Tab.Screen name="Login">
                      {() => <Auth setIsLoggedIn={setIsLoggedIn}/>}
                    </Tab.Screen>
                }
                <Tab.Screen name="Ship" component={Ship}/>
                </Tab.Navigator>
                <StatusBar style="auto" />
                <FlashMessage position="top" />
            </SafeAreaView>
        </NavigationContainer>

  );
}
