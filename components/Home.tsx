import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import keyboard from '../assets/keyboard.jpg';
import Stock from './Stock.tsx';
// import StockList from './Stock.tsx';
import { Base, Typography } from '../styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function Home(){
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Stock" component={Stock}/>
        </Stack.Navigator>
        );
}
