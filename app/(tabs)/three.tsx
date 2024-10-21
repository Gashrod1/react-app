import { StyleSheet } from 'react-native';

import LoginForm from '@/components/LoginForm'
import { Text, View } from '@/components/Themed';


export default function TabOneScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Se connecter</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <LoginForm/>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 50,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });