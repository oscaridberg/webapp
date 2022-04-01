import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import keyboard from './assets/keyboard.jpg';
import Stock from './components/Stock.tsx';
import StockList from './components/Stock.tsx';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.base}>
          <Text style={styles.header}>Custom Keyboards</Text>
          <Image style={styles.image} source={keyboard} />
          <StockList />
          <StatusBar style="auto" />
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'teal',
  },
  image: {
      width: 400,
      height: 200,
      margin: 'auto',
      marginBottom: 10,
  },
  base: {
      flex: 1,
      backgroundColor: 'teal',
  },
  header: {
      color: '#111',
      backgroundColor: 'pink',
      fontSize: 32,
      padding: 5,
      paddingLeft: 12,
      paddingRight: 12,
      marginBottom: 5,
  },
});
