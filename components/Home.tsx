import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import keyboard from '../assets/keyboard.jpg';
import Stock from './Stock.tsx';
import StockList from './Stock.tsx';
import { Base, Typography } from '../styles';


export default function Home(){
    return (
        <View style={Base.container}>
        <ScrollView style={Base.base}>
              <Text style={Base.header}>Custom Keyboards</Text>
              <Image style={Base.image} source={keyboard} />
              <StockList />
        </ScrollView>
        </View>
        );
}
